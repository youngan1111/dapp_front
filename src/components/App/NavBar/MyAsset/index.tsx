import styled from "@emotion/styled"
import Image from "next/image"
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { TYPO } from "@/assets/fonts"
import { css } from "@emotion/react"
import { COLOR } from "@/assets/colors"
import { ComponentProps, useEffect, useState } from "react"
import { truncateAddress } from "../utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowRight,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons"
import { useTokens } from "@/hooks/useTokens"
import MetaMask from "@/assets/icons/common/metamask.svg"
import { useRecoilState } from "recoil"
import { networkState } from "@/recoils/networkState"
import { useMetamask } from "@/hooks/useMetamask"

interface Props extends ComponentProps<"div"> {
  walletName: string
}

/**
 * My-Asset 팝업창
 */
const MyAsset = ({ walletName, ...props }: Props) => {
  const { wallets, disconnect, account } = useWallet()
  const { metaAccount, onDisconnect } = useMetamask()
  const [curNet, setCurNet] = useRecoilState(networkState)
  const [addr, setAddr] = useState("")
  const [tokens, rates] = useTokens()

  const disconnectWallet = () => {
    if (confirm("Are you sure you want to disconnect?")) {
      curNet.name === "Aptos" ? disconnect() : onDisconnect()
    }
  }

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      alert("Copied your Account Address in Clipboard!")
    } catch (e) {
      alert("Failed to copy clipboard.")
    }
  }

  useEffect(() => {
    switch (curNet.name) {
      case "Aptos":
        setAddr(account?.address!)
        break
      case "Sepolia":
        setAddr(metaAccount!)
        break
      default:
        break
    }
  }, [curNet])

  return (
    <Container {...props}>
      <TitleWrapper>
        <span
          css={css`
            ${TYPO.text3_mon.Bd};
            color: ${COLOR.Gray};
          `}
        >
          Connected with {walletName}
        </span>
        <span
          css={css`
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 5px;
          `}
        >
          <Image
            src={walletName === "MetaMask" ? MetaMask : wallets[0].icon}
            alt="wallet"
            width={20}
            height={20}
            style={{ width: "20px", height: "auto" }}
          />
          <span
            onClick={() => handleCopyClipBoard(addr)}
            css={css`
              ${TYPO.text3_mon.Bd};
              cursor: pointer;
            `}
          >
            {truncateAddress(addr)}
          </span>
        </span>
      </TitleWrapper>
      <TitleWrapper>
        <span
          css={css`
            ${TYPO.text3_mon.Bd};
            color: ${COLOR.Gray};
          `}
        >
          My Asset
        </span>
        <span
          css={css`
            ${TYPO.caption.Reg};
            color: ${COLOR.Label};
          `}
        >
          ${tokens.get("QVE")?.available.toFixed(4)}
        </span>
        <span css={TYPO.text1_pre.Bd}>
          {curNet.name === "Sepolia"
            ? tokens.get("SepoliaETH")?.available.toFixed(4)
            : tokens.get("QVE")?.available.toFixed(4)}{" "}
          {curNet.name === "Sepolia" ? "SepoliaETH" : "ETH"}
        </span>
      </TitleWrapper>
      <DisconnectButton onClick={() => disconnectWallet()}>
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </DisconnectButton>
      <InvestWrapper>
        <InvestButton>Invest</InvestButton>
        <span
          css={css`
            ${TYPO.label.Reg};
            color: ${COLOR.Label};
            cursor: pointer;
          `}
        >
          View My NFTs
          <FontAwesomeIcon icon={faArrowRight} />
        </span>
      </InvestWrapper>
    </Container>
  )
}

const Container = styled.div`
  width: 310px;
  height: 180px;
  border-radius: 20px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  position: absolute;
  top: 50px;
  right: 0px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
  padding: 0px 20px;
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 5px;
`

const DisconnectButton = styled.button`
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  cursor: pointer;
  top: 15px;
  right: 15px;
  border-radius: 5px;
  padding: 5px;
  transition: all 0.2s;

  &:hover {
    background-color: #00000011;
  }
`

const InvestWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  position: absolute;
  bottom: 15px;
  right: 15px;
  gap: 5px;
`

const InvestButton = styled.button`
  ${TYPO.caption.Bd};
  padding: 7px 13px;
  border-radius: 20px;
  color: white;
  background-color: ${COLOR.Blue};
  cursor: pointer;
  border: none;
`

export default MyAsset
