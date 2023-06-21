// import Logo from "@/assets/icons/logo/logo-color.svg";
import Logo from "@/assets/icons/logo/HYU_symbol_basic.png"

import Image from "next/image"
import styled from "@emotion/styled"
import { useRouter } from "next/router"
import { css } from "@emotion/react"
import Network from "./Network"
import { CustomWalletSelector } from "./WalletSelector"
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import MyWallet from "./MyWallet"
import { TYPO } from "@/assets/fonts"
import { paddings } from "../Common/paddings"
import { useCallback, useEffect, useState } from "react"
import { useRecoilState, useResetRecoilState } from "recoil"
import { networkState } from "@/recoils/networkState"
import MetaWallet from "./MetaWallet"
import { metaState } from "@/recoils/metamask"

const MENUS = ["Investment"]

/**
 * PC 네비게이션 바
 */
const PC = () => {
  const router = useRouter()
  const { connected, disconnect } = useWallet()
  const [curNet, setCurNet] = useRecoilState(networkState)
  const onDisconnect = useResetRecoilState(metaState)
  const [rendered, setRendered] = useState(false)

  const LogoImage = useCallback(() => {
    return (
      <Image
        src={Logo}
        alt="logo"
        height={100}
        style={{ width: "auto", height: "100%" }}
      />
    )
  }, [])

  useEffect(() => {
    setRendered(true)
  }, [])

  useEffect(() => {
    if (rendered) {
      disconnect()
      onDisconnect()
    }
  }, [curNet])

  const WalletButton = () => {
    switch (curNet.name) {
      case "Aptos":
        return connected ? <MyWallet /> : <CustomWalletSelector />
      case "Ethereum":
        return <MetaWallet />
      case "Sepolia":
        return <MetaWallet />
      default:
        return <></>
    }
  }

  return (
    <BarWrapper>
      <LeftWrapper>
        <LogoWrapper>
          <LogoImage />
        </LogoWrapper>
        <MenuList>
          {MENUS.map((menu, idx) => (
            <Menu
              clicked={router.pathname.slice(5) === menu.toLowerCase()}
              onClick={() => router.push(`/app/${menu.toLowerCase()}`)}
              key={menu}
            >
              {menu}
            </Menu>
          ))}
        </MenuList>
      </LeftWrapper>
      <RightWrapper>
        <Network />
        <WalletButton />
      </RightWrapper>
    </BarWrapper>
  )
}

const flex = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const BarWrapper = styled.div`
  width: 100%;
  ${flex};
  justify-content: space-between;
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 30px 0px;
  ${paddings};
`

const LogoWrapper = styled.span`
  height: 40px;
  position: relative;
  cursor: pointer;
`

const MenuList = styled.ul`
  list-style-type: none;
  margin: 0px;
  padding: 0px;
  ${flex};
  justify-content: center;
  gap: 25px;
`

const Menu = styled.li<{ clicked: boolean }>`
  ${(props) => (props.clicked ? TYPO.text2_mon.Bd : TYPO.text2_mon.Reg)}
  color: #3a3c61;
  padding: ${(props) => (props.clicked ? `3px` : "0px")};
  transition: all 0.1s;
  cursor: pointer;
  border-bottom: ${(props) => (props.clicked ? `4px solid #3A3C61` : "")};
  opacity: ${(props) => (props.clicked ? 1 : 0.6)};

  &:hover {
    padding-bottom: ${(props) => (props.clicked ? "" : "1px")};
    border-bottom: ${(props) => (props.clicked ? "" : "3px solid #3a3c61c8")};
    opacity: 1;
  }
`

const LeftWrapper = styled.div`
  ${flex};
  gap: 50px;
`

const RightWrapper = styled.div`
  ${flex};
  justify-content: center;
  gap: 20px;
`
export default PC
