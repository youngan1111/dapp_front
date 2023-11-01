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
import { COLOR } from "@/assets/colors"
import Logo from "@/assets/icons/logo/HYU_symbol_basic.png"
import Image from "next/image"
import { TYPO } from "@/assets/fonts"
import { useMetamask } from "@/hooks/useMetamask"
import { thousandSeparator } from "@/utils/thousandSeparator"
import TitleBox from "@/components/App/Common/TitleBox"
import TextBox from "@/components/App/Common/TextBox"

const TokenFactoryComponent: React.FC = () => {
  const [curNet, setCurNet] = useRecoilState(networkState)
  const { TOKENS } = useNetwork()
  const [curToken, setCurToken] = useState<TokenInfo>(TOKENS[0])
  const { metaAccount, onDisconnect } = useMetamask()
  const [stoTokens, setSTOTokens] = useState<stoInfo[]>([])

  type stoInfo = {
    asset: string
    address: string
    quantity: number
  }

  const truncateId = (address: string): string => {
    if (!address) return ""
    return `${address.slice(0, 6)}...${address.slice(-6)}`
  }

  useEffect(() => {
    const tokenAddressesString = localStorage.getItem("tokenAddresses")
    if (tokenAddressesString) {
      const tokenAddresses: stoInfo[] = JSON.parse(tokenAddressesString)
      setSTOTokens(tokenAddresses)

      tokenAddresses.forEach((tokenInfo, index) => {
        fetch(
          `https://api-sepolia.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${tokenInfo.address}&address=${metaAccount}&tag=latest&apikey=${process.env.NEXT_PUBLIC_SEPOLIA_ETHERSCAN_API_KEY}`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            const updatedTokenInfo = {
              ...tokenInfo,
              quantity: data.result.slice(0, -36),
            }

            setSTOTokens((prevTokens) => {
              const updatedTokens = [...prevTokens]
              updatedTokens[index] = updatedTokenInfo
              return updatedTokens
            })
          })
          .catch((error) => {
            console.error("Error fetching ABI:", error)
          })
      })
    }
  }, [])

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
        <TitleBox title="내 토큰 증권" subtitle="My Security Token" />
        <BoxWrapper>
          <Frame css={frameStyle}>
            <Container>
              {stoTokens.length > 0 ? (
                <TokenList>
                  {stoTokens.map((token, index) => (
                    <TokenContainer>
                      <TokenWrapper>
                        <Image
                          src={Logo}
                          alt="nft"
                          width={58}
                          height={58}
                          css={logoCss}
                        />
                        <MyTitleBox>
                          <span
                            css={css`
                              ${TYPO.text2_mon.Bd};
                              color: ${COLOR.Gray};
                              display: flex;
                              flex-direction: row;
                              align-items: center;
                              justify-content: flex-start;
                              gap: 8px;
                            `}
                          >
                            {token.asset}
                          </span>
                          <span
                            css={css`
                              ${TYPO.text3_mon.Reg};
                              color: ${COLOR.Label};
                            `}
                          >
                            {token.address}
                          </span>
                        </MyTitleBox>
                      </TokenWrapper>
                      <InfoWrapper>
                        <TextBox
                          caption={"Token Address"}
                          preview={truncateId(token.address)}
                        />
                        <TextBox
                          caption={"Token Holding"}
                          preview={String(thousandSeparator(token.quantity))}
                        />
                      </InfoWrapper>
                      {/* <FoundationWrapper>
                        <span
                          css={css`
                            ${TYPO.caption.Reg};
                            color: ${COLOR.Gray};
                          `}
                        >
                          {thousandSeparator(Number(token.quantity))}
                        </span>
                      </FoundationWrapper> */}
                    </TokenContainer>
                  ))}
                </TokenList>
              ) : (
                <p>No STO tokens found.</p>
              )}
            </Container>
          </Frame>
        </BoxWrapper>
      </InnerContainer>
    </>
  )
}

const logoCss = css`
  width: 45px;
  height: 45px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 10px;
  ${mq[2]} {
    width: 58px;
    height: 58px;
    border-radius: 20px;
  }
`

const TokenContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
  border-radius: 8px;
  gap: 10px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s;
`

const TokenWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
`

const MyTitleBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
`

const InfoWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 5px;
  margin-left: 60px;
  ${mq[0]} {
    width: 80%;
  }
  ${mq[2]} {
    margin-left: 73px;
  }
`

const FoundationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
  position: absolute;
  bottom: 20px;
  right: 15px;
`

const CheckBox = styled.div<{ selected: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 7px;
  background-color: ${COLOR.LightGray};
  border: 2px solid ${(props) => (props.selected ? COLOR.Blue : COLOR.Label)};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  right: 10px;
  transition: all 0.2s;
`

const StyledContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f7f7f7;
`

const TokenList = styled.ul`
  width: 100%;
  height: 300px;
  padding: 5px 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${COLOR.Label};
    border-radius: 500px;
  }
  &::-webkit-scrollbar-track {
    background-color: #00ff0000;
  }
`

const TokenItem = styled.li`
  background-color: #fff;
  margin: 10px 0;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:nth-child(odd) {
    background-color: #e9e9e9;
  }
`

const TokenInfos = styled.span`
  display: block; // To make each piece of info appear on a new line
  margin-bottom: 5px;
  font-size: 16px;
  color: #333;

  &:last-child {
    margin-bottom: 0;
  }
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

export default TokenFactoryComponent
