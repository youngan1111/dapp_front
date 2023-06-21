import { COLOR } from "@/assets/colors"
import styled from "@emotion/styled"
import Image from "next/image"
import Wallet from "@/assets/icons/common/wallet-color.svg"
import { truncateAddress } from "./utils"
import { useState, useRef } from "react"
import Metamask from "@/assets/icons/common/metamask.svg"
import MyAsset from "./MyAsset"
import { useOutsideClick } from "@/hooks/useOutsideClick"
import { useMetamask } from "@/hooks/useMetamask"
import { useRecoilState } from "recoil"
import { networkState } from "@/recoils/networkState"

interface Props {
  mobile?: boolean
}

const MetaWallet = ({ mobile }: Props) => {
  const [curNet, setCurNet] = useRecoilState(networkState)
  const { onConnect, isConnected, metaAccount } = useMetamask()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick(ref, () => setIsOpen(false))

  return !isConnected ? (
    <CustomButton
      className="wallet-button"
      onClick={() => {
        if (curNet.name === "Sepolia") return onConnect("sepolia")
        else return onConnect("mainnet")
      }}
    >
      <ButtonText>Connect Wallet</ButtonText>
      <Image
        src={Wallet}
        alt="wallet-logo"
        width={100}
        style={{ width: "18px", height: "auto" }}
      />
    </CustomButton>
  ) : (
    <>
      <ContainerWrapper ref={ref}>
        <Container
          onClick={() => {
            !mobile ? setIsOpen((prev) => !prev) : null
          }}
        >
          <Image
            src={Metamask}
            alt="petra-wallet"
            width={20}
            height={20}
            style={{ width: "20px", height: "auto" }}
          />
          <ButtonText>{truncateAddress(metaAccount!)}</ButtonText>
        </Container>
        {isOpen ? <MyAsset walletName="MetaMask" /> : <></>}
      </ContainerWrapper>
    </>
  )
}

const ContainerWrapper = styled.div`
  position: relative;
`

const Container = styled.button`
  width: 130px;
  height: 42px;
  border-radius: 15px;
  background-color: ${COLOR.White};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: none;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`

const CustomButton = styled.button`
  width: 157px;
  height: 42px;
  border-radius: 15px;
  background-color: ${COLOR.White};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`

const ButtonText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #3a3c61;
`

export default MetaWallet
