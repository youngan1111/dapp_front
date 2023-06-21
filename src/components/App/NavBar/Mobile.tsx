import styled from "@emotion/styled"
import Logo from "@/assets/icons/logo/logo-color.svg"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { COLOR } from "@/assets/colors"
import { TYPO } from "@/assets/fonts"
import { css } from "@emotion/react"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"
import CustomBottomSheet from "./CustomBottomSheet"

const MENUS = ["Mint NFT"]

/**
 * 모바일 네비게이션 바
 */
const Mobile = () => {
  const router = useRouter()
  const [modal, setModal] = useState(false)
  const LogoImage = useCallback(() => {
    return <Image src={Logo} alt="logo" fill />
  }, [])

  return (
    <Container>
      <NavList>
        <LogoWrapper onClick={() => router.push("/")}>
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
      </NavList>
      <Hamburger onClick={() => setModal(true)}>
        <FontAwesomeIcon icon={faBars} />
      </Hamburger>
      <CustomBottomSheet modal={modal} onClose={() => setModal(false)} />
    </Container>
  )
}

const flex = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Container = styled.div`
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  ${flex};
  padding: 30px;
  justify-content: space-between;
`

const NavList = styled.ul`
  list-style-type: none;
  padding: 0px;
  margin: 0px;
  ${flex}
  justify-content: flex-start;
  gap: 30px;
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
`

const LogoWrapper = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  cursor: pointer;
`

const Hamburger = styled.span`
  font-size: 20px;
  cursor: pointer;
  color: ${COLOR.Gray};
`

export default Mobile
