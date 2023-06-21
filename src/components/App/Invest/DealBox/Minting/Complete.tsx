import { COLOR } from "@/assets/colors"
import { TYPO } from "@/assets/fonts"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import Logo from "@/assets/icons/logo/HYU_symbol_basic.png"
import Image from "next/image"

const Complete = () => {
  return (
    <Container>
      <span
        css={css`
          ${TYPO.text3_mon.Bd};
          color: ${COLOR.Gray};
        `}
      >
        New Minted NFT!
      </span>

      <Image
        src={Logo}
        alt="logo"
        height={100}
        style={{ width: "auto", height: "100%" }}
      />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 10px;
`

export default Complete
