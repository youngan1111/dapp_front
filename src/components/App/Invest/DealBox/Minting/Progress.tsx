import { COLOR } from "@/assets/colors"
import { TYPO } from "@/assets/fonts"
import Bounce from "@/components/App/Common/Bounce"
import { css } from "@emotion/react"
import styled from "@emotion/styled"

const Progress = () => {
  return (
    <Container>
      <span
        css={css`
          ${TYPO.text3_mon.Bd};
          color: ${COLOR.Gray};
        `}
      >
        Minting your NFT ...
      </span>
      <Bounce />
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

export default Progress
