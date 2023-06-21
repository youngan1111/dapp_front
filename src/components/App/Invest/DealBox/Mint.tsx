import styled from "@emotion/styled"
import { CustomButton, CustomInput } from "../Custom"
import { useEffect, useState } from "react"
import { inputNumberReg } from "@/utils/numberReg"
import { useTokens } from "@/hooks/useTokens"
import { APTOS_TOKENS, SEPOLIA_TOKENS, TokenInfo } from "@/assets/tokens"
import { Progress, Complete, DoNothing } from "./Minting"
import { useNetwork } from "@/hooks/useNetwork"
import { useRecoilState } from "recoil"
import { networkState } from "@/recoils/networkState"
import { ethers } from "ethers"
import axios from "axios"

const Components = [() => <></>, Progress, Complete] as const

const depositContract = require("@/assets/contracts/Deposit.json")
const myTetherContract = require("@/assets/contracts/MyTether.json")

const Mint = () => {
  const [isMax, setIsMax] = useState(false)
  const [mint, setMint] = useState({ title: "Deposit", isActive: true })
  const [info, setInfo] = useState({ input: "", available: "" })
  const [calc, setCalc] = useState({ result: 0, loading: false })
  const { TOKENS } = useNetwork()
  const [curToken, setCurToken] = useState<TokenInfo>(TOKENS[0])
  const [tokens, rates] = useTokens()
  const [stage, setStage] = useState(0)
  const [curNet, setCurNet] = useRecoilState(networkState)
  const CurStage = Components[stage]

  const onMax = () => {
    setInfo((prev) => {
      return { ...prev, input: prev.available }
    })
    setIsMax(true)
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo((prev) => {
      return { ...prev, input: inputNumberReg(e) }
    })
  }

  const onCalc = () => {
    //압력값이 비어있는 경우
    if (info.input === "" || Number(info.input) === 0) {
      setIsMax(false)
      setMint({ title: "Empty", isActive: false })
      setCalc((prev) => {
        return { ...prev, result: 0 }
      })
      return
    }

    setMint({ title: "Deposit", isActive: true })
    //현재 갖고있는 재산과 비교
    if (Number(info.input) >= Number(info.available)) {
      setInfo((prev) => {
        return {
          ...prev,
          input: `${info.available}`,
        }
      })
      setIsMax(true)
    } else {
      setIsMax(false)
    }

    if (rates?.APT.USD) {
      const calResult = Number(info.input) * Number(rates?.APT.USD)
      setCalc((prev) => {
        return { ...prev, result: Number(calResult.toFixed(6)) }
      })
    }
  }

  const onMint = async () => {
    setStage(1)
    const { data } = await axios({
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      method: "POST",
      headers: {
        pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
        pinata_secret_api_key: process.env.NEXT_PUBLIC_API_SECRET,
      },
      data: {
        pinataMetadata: {
          name: "Mint NFT data",
        },
        pinataContent: {
          name: "NFT mint",
          description: "graduate project",
          startTimestamp: new Date().getTime(),
          endTimestamp: new Date().getTime(), // user selected month
          attributes: [
            {
              net_deposit: info.input,
              currency: curToken.title,
            },
          ],
        },
      },
    })

    if (mint.isActive && stage === 0) {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" })

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        const tetherContract = new ethers.Contract(
          process.env.NEXT_PUBLIC_TETHER_TOKEN_ADDRESS!,
          myTetherContract.abi,
          signer
        )
        const amountToApprove = ethers.utils.parseEther(info.input)

        const transation = await tetherContract.approve(
          process.env.NEXT_PUBLIC_DEPOSIT_CONTRACT_ADDRESS,
          amountToApprove
        )
        await transation.wait()

        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_DEPOSIT_CONTRACT_ADDRESS!,
          depositContract.abi,
          signer
        )
        const mintTransaction = await contract.deposit(
          process.env.NEXT_PUBLIC_TETHER_TOKEN_ADDRESS,
          amountToApprove,
          `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`
        )
        await mintTransaction.wait()
      }

      setStage((prev) => prev + 1)
      setMint({ isActive: false, title: "Completed" })
    }
  }

  useEffect(() => {
    // 로딩 상태 변경
    setCalc((prev) => {
      return { ...prev, loading: true }
    })
    // 타이머를 세팅하고 그 반환값인 식별자를 변수에 담는다.
    const timer = setTimeout(() => {
      onCalc()
      setCalc((prev) => {
        return { ...prev, loading: false }
      }) // 로딩 상태 초기화
    }, 500)

    // useEffect의 리턴부에 타이머를 해제시킨다.(클린업)
    return () => clearTimeout(timer)
  }, [info.input])

  useEffect(() => {
    if (tokens.get(curToken.title)) {
      setInfo({
        input: "",
        available: `${tokens.get(curToken.title)?.available}`,
      })
    } else {
      setInfo({ input: "", available: "0" })
    }
  }, [tokens, curToken])

  // useEffect(() => {
  //   if (stage === 1) {
  //     setStage(2)
  //     setMint({ isActive: false, title: "Complete!" })
  //   }
  // }, [stage])

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
    <Container>
      <CustomInput
        isMax={isMax}
        onMax={onMax}
        onChange={onChangeInput}
        value={info.input}
        result={calc.result}
        loading={calc.loading}
        curToken={curToken}
        setToken={(token: TokenInfo) => setCurToken(token)}
        minting={stage !== 0}
        disabled={stage !== 0}
      />
      <CurStage />
      <CustomButton
        isActive={mint.isActive}
        title={mint.title}
        onClick={() => onMint()}
      />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

export default Mint
