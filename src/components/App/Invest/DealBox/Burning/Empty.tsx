import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { TYPO } from "@/assets/fonts"
import { COLOR } from "@/assets/colors"
import TextBox from "./TextBox"

/**
 * NFT가 없을 때 나오는 컴포넌트
 */
const Empty = () => {
  return (
    <Container>
      <Wrapper>
        <span
          css={css`
            ${TYPO.text3_mon.Bd};
            color: ${COLOR.Label};
            text-align: center;
          `}
        >
          You don’t have any NFT...
        </span>
      </Wrapper>
      <Wrapper
        css={css`
          gap: 10px;
        `}
      >
        <TextBox caption={"bla bla"} title={`$0.00`} subtitle={`$0.00`} />
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 50px;
`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default Empty
