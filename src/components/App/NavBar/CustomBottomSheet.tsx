import styled from "@emotion/styled"
import { BottomSheet } from "@qve-ui/qds"
import { CustomWalletSelector } from "./WalletSelector"
import { useRecoilState, useResetRecoilState } from "recoil"
import { networkState } from "@/recoils/networkState"
import MetaWallet from "./MetaWallet"
import Network from "./Network"
import { css } from "@emotion/react"
import { TYPO } from "@/assets/fonts"
import { COLOR } from "@/assets/colors"
import { useEffect, useState } from "react"
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { metaState } from "@/recoils/metamask"
import MyWallet from "./MyWallet"
import MyAsset from "./MyAsset"

interface Props {
  modal: boolean
  onClose: () => void
}

/**
 * 모바일 네비게이션 바에서 사용하는 바텀시트
 */
const CustomBottomSheet = ({ modal, onClose }: Props) => {
  const [curNet, setCurNet] = useRecoilState(networkState)
  const { connected, disconnect } = useWallet()
  const onDisconnect = useResetRecoilState(metaState)
  const [meta, setMeta] = useRecoilState(metaState)
  const [rendered, setRendered] = useState(false)

  const WalletButton = () => {
    switch (curNet.name) {
      case "Aptos":
        return connected ? <MyWallet mobile={true} /> : <CustomWalletSelector />
      case "Ethereum":
        return <MetaWallet mobile={true} />
      case "Sepolia":
        return <MetaWallet mobile={true} />
      default:
        return <></>
    }
  }

  const Objet = () => {
    return (
      <ObjWrapper>
        <span
          css={css`
            ${TYPO.text3_mon.Bd};
            color: ${COLOR.Gray};
          `}
        >{`For Asset Manager, For Personal Traders`}</span>
        <span
          css={css`
            ${TYPO.caption.Reg};
            color: ${COLOR.Gray};
            margin-top: 3px;
          `}
        >
          Decentralized Investing Fund Liquidation Platform
        </span>
      </ObjWrapper>
    )
  }

  const Content = () => {
    switch (curNet.name) {
      case "Aptos":
        return connected ? (
          <MyAsset walletName="Petra Wallet" css={infoStyle} />
        ) : (
          <Objet />
        )
      case "Ethereum":
        return meta.connected ? (
          <MyAsset walletName="MetaMask" css={infoStyle} />
        ) : (
          <Objet />
        )
      case "Sepolia":
        return meta.connected ? (
          <MyAsset walletName="MetaMask" css={infoStyle} />
        ) : (
          <Objet />
        )
      default:
        return <></>
    }
  }

  useEffect(() => {
    setRendered(true)
  }, [])

  useEffect(() => {
    if (rendered) {
      disconnect()
      onDisconnect()
    }
  }, [curNet])

  return (
    <BottomSheet isOpen={modal} ratio={35} onClose={onClose}>
      <ModalContainer>
        <SelectorWrapper>
          <Network />
          <WalletButton />
        </SelectorWrapper>
        <ContentWrapper>
          <Content />
        </ContentWrapper>
      </ModalContainer>
    </BottomSheet>
  )
}

const ModalContainer = styled.div`
  width: 100vw;
  height: 100%;
  background-color: white;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  padding: 10px;
`

const SelectorWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
  position: absolute;
  top: 15px;
  left: 0px;
`

const ContentWrapper = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ObjWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const infoStyle = css`
  box-shadow: rgba(149, 157, 165, 0) 0px 8px 24px;
  position: relative;
  top: 10px;
  right: 0px;
`

export default CustomBottomSheet
