import { COLOR } from "@/assets/colors"
import styled from "@emotion/styled"
import { TokenInfo } from "@/assets/tokens"
import { ComponentProps, useEffect } from "react"
import Image from "next/image"
import { css } from "@emotion/react"
import { TYPO } from "@/assets/fonts"
import { useNetwork } from "@/hooks/useNetwork"
import { walletBalance } from "@/recoils/walletBalance"
import { useRecoilState } from "recoil"
import { useMetamask } from "@/hooks/useMetamask"
import axios from "axios"

interface Props extends ComponentProps<"div"> {
  curToken: TokenInfo
  setToken: (token: TokenInfo) => void
  onClose: () => void
}

/**
 * 인풋에서 토큰 선택 모달
 */
const TokenSelectorModal = ({
  curToken,
  setToken,
  onClose,
  ...props
}: Props) => {
  const { TOKENS } = useNetwork()
  const [tokens, setTokens] = useRecoilState(walletBalance)
  const { metaAccount } = useMetamask()

  const getSpecificToken = async (token: TokenInfo) => {
    const { data } = await axios.get(
      `https://api-sepolia.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${token.tokenAddress}&address=${metaAccount}&tag=latest&apikey=${process.env.SEPOLIA_ETHERSCAN_API_KEY}`
    )
    if (data.status === "0") setTimeout(() => getSpecificToken(token), 1000)
    else {
      setTokens((prev) =>
        new Map(prev).set(token.title, {
          available: Math.floor((Number(data.result) / 10 ** 18) * 1e6) / 1e6,
        })
      )
    }
  }

  const onSelect = async (token: TokenInfo) => {
    getSpecificToken(token)
    console.log(token)
    setToken(token)
    onClose()
  }

  return (
    <Container {...props}>
      {TOKENS.map((token) => (
        <TokenWrapper key={token.title} onClick={() => onSelect(token)}>
          <Image src={token.img} width={24} height={24} alt="apt" />
          <span
            css={css`
              ${TYPO.text2_mon.Bd};
              color: ${COLOR.Background};
            `}
          >
            {token.title}
          </span>
        </TokenWrapper>
      ))}
    </Container>
  )
}

const Container = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  gap: 5px;
`

const TokenWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px;

  &:hover {
    background-color: #7474742a;
  }
`

export default TokenSelectorModal
