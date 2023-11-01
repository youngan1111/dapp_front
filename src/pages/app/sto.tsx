import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import { inputNumberReg } from "@/utils/numberReg"
import { useTokens } from "@/hooks/useTokens"
import { APTOS_TOKENS, SEPOLIA_TOKENS, TokenInfo } from "@/assets/tokens"
import { useNetwork } from "@/hooks/useNetwork"
import { useRecoilState } from "recoil"
import { networkState } from "@/recoils/networkState"
import { ethers } from "ethers"
import axios from "axios"
import { mq, paddings } from "@/components/App/Common/paddings"
import { css } from "@emotion/react"
import Frame from "@/components/App/Common/Frame"
import TitleBox from "@/components/App/Common/TitleBox"
import { COLOR } from "@/assets/colors"
import { TYPO } from "@/assets/fonts"
import Bounce from "@/components/App/Common/Bounce"
import Logo from "@/assets/icons/logo/HYU_symbol_basic.png"
import Image from "next/image"

const Progress = () => {
  return (
    <ProgressContainer>
      <span
        css={css`
          ${TYPO.text3_mon.Bd};
          color: ${COLOR.Gray};
        `}
      >
        Creating Your Token ...
      </span>
      <Bounce />
    </ProgressContainer>
  )
}

const Complete = () => {
  return (
    <CompleteContainer>
      <span
        css={css`
          ${TYPO.text3_mon.Bd};
          color: ${COLOR.Gray};
        `}
      >
        Token Created Successfully!
      </span>

      <Image
        src={Logo}
        alt="logo"
        height={100}
        style={{ width: "auto", height: "100%" }}
      />
    </CompleteContainer>
  )
}

const factoryContract = require("@/assets/contracts/TokenFactory.json")
const Components = [() => <></>, Progress, Complete] as const

const TokenFactoryComponent: React.FC = () => {
  const [curNet, setCurNet] = useRecoilState(networkState)
  const [tokenFactory, setTokenFactory] = useState<any | null>(null)

  const [isMax, setIsMax] = useState(false)
  const [create, setCreate] = useState({ title: "Create", isActive: true })
  const [info, setInfo] = useState({ input: "", available: "" })
  const [calc, setCalc] = useState({ result: 0, loading: false })
  const { TOKENS } = useNetwork()
  const [curToken, setCurToken] = useState<TokenInfo>(TOKENS[0])
  const [tokens, rates] = useTokens()
  const [stage, setStage] = useState(0)

  const CurStage = Components[stage]

  const createToken = async (
    asset: string,
    name: string,
    symbol: string,
    initialSupply: string
  ) => {
    setStage(1)

    if (typeof window.ethereum !== "undefined") {
      await window.ethereum.request({ method: "eth_requestAccounts" })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()

      const tokenFactoryContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS!,
        factoryContract.abi,
        signer
      )

      try {
        const tx = await tokenFactoryContract.createToken(
          name,
          symbol,
          ethers.utils.parseEther(initialSupply)
        )

        const receipt = await tx.wait()
        const TokenCreatedEvent = receipt.events?.find(
          (e: any) => e.event === "TokenCreated"
        )
        if (TokenCreatedEvent) {
          const newTokenAddress = TokenCreatedEvent.args?.tokenAddress

          const tokenAddressesString = localStorage.getItem("tokenAddresses")
          let tokenAddresses = []
          if (tokenAddressesString) {
            tokenAddresses = JSON.parse(tokenAddressesString)
          }
          tokenAddresses.push({ asset, address: newTokenAddress })
          const updatedTokenAddressesString = JSON.stringify(tokenAddresses)
          localStorage.setItem("tokenAddresses", updatedTokenAddressesString)
        }

        alert(`Token ${name} (${symbol}) created!`)
      } catch (err: any) {
        setStage(0)
        console.error("Error:", err)
        alert(`Failed to create token. ${err.message}`)
        return
      }
      setStage((prev) => prev + 1)
      setCreate({ isActive: false, title: "Completed" })
    }
  }

  useEffect(() => {
    switch (curNet.name) {
      case "Aptos":
        setCurToken(APTOS_TOKENS[0])
        break
      case "Sepolia":
        setCurToken(SEPOLIA_TOKENS[0])
        break
      default:
        break
    }
  }, [curNet])

  return (
    <>
      <InnerContainer>
        <TitleBox title="토큰 증권 발행" subtitle="Security Token Offering" />
        <BoxWrapper>
          <Frame css={frameStyle}>
            <Container>
              <h2>Create Token</h2>
              <input placeholder="유동화 자산" id="assetName" />
              <input placeholder="토큰 이름" id="tokenName" />
              <input placeholder="토큰 심볼" id="tokenSymbol" />
              <input type="number" placeholder="토큰 발행량" id="tokenSupply" />
              <CurStage />
              <Button
                isActive={create.isActive}
                onClick={() => {
                  const asset = (
                    document.getElementById("assetName") as HTMLInputElement
                  ).value
                  const name = (
                    document.getElementById("tokenName") as HTMLInputElement
                  ).value
                  const symbol = (
                    document.getElementById("tokenSymbol") as HTMLInputElement
                  ).value
                  const supply = (
                    document.getElementById("tokenSupply") as HTMLInputElement
                  ).value
                  createToken(asset, name, symbol, supply)
                }}
              >
                {create.title}
              </Button>
            </Container>
          </Frame>
        </BoxWrapper>
      </InnerContainer>
    </>
  )
}

const Button = styled.button<{ isActive: boolean }>`
  width: 100%;
  height: 52px;
  border-radius: 20px;
  background-color: ${(props) => (props.isActive ? COLOR.Blue : COLOR.Label)};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLOR.White};
  ${TYPO.text3_mon.Bd};
  border: none;
  cursor: pointer;
`

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

const frameStyle = css`
  margin-top: 20px;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 20px;
  gap: 20px;

  ${mq[0]} {
    width: 95%;
    padding: 40px 30px;
  }
  ${mq[1]} {
    width: 50%;
  }
  ${mq[3]} {
    width: 477px;
  }
`

const InnerContainer = styled.div`
  width: 100%;
  padding-top: 110px;
  ${paddings};
`

const BoxWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  position: relative;

  ${mq[1]} {
    justify-content: space-between;
    gap: 0px;
  }
`

const ProgressContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 10px;
`

const CompleteContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 10px;
`

export default TokenFactoryComponent
