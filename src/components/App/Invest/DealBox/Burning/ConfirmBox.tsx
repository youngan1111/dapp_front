import styled from "@emotion/styled"
import { ComponentProps } from "react"
import { NFTProps } from "./nft"
import ConfirmItem from "./ConfirmItem"
import { COLOR } from "@/assets/colors"
import TextBox from "./TextBox"

interface Props extends ComponentProps<"div"> {
  tokens: Array<NFTProps>
  choices: Array<string>
  percent: number
}

const ConfirmBox = ({ tokens, choices, percent, ...props }: Props) => {
  return (
    <Container {...props}>
      <TokenConfirmBox>
        {tokens.map((token) =>
          choices.includes(token.tID) ? (
            <ConfirmItem key={token.tID} token={token} />
          ) : (
            <></>
          )
        )}
      </TokenConfirmBox>
      <Wrapper>
        <TextBox caption={"Total Return Value"} title={`$0.00`} />
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
  gap: 20px;
`

const TokenConfirmBox = styled.div`
  width: 100%;
  height: 215px;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  padding: 5px 10px;

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

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`

export default ConfirmBox
