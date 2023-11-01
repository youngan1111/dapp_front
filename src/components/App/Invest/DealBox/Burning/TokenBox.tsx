import { COLOR } from "@/assets/colors"
import styled from "@emotion/styled"
import TokenItem from "./TokenItem"
import { SetStateAction, Dispatch } from "react"
import { NFTProps } from "./nft"

interface Props {
  tokens: Array<NFTProps>
  choices: Array<string>
  setChoices: Dispatch<SetStateAction<Array<string>>>
}

const TokenBox = ({ tokens, choices, setChoices }: Props) => {
  const onSelect = (tID: string) => {
    if (choices.includes(tID)) {
      const newChoices = choices.filter((choice) => choice !== tID)
      setChoices(newChoices)
    } else setChoices((prev) => [...prev, tID])
  }

  return (
    <Container>
      {tokens.map((token) => (
        <TokenItem
          key={token.tID}
          token={token}
          selected={choices.includes(token.tID)}
          onClick={() => onSelect(token.tID)}
        />
      ))}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 300px;
  padding: 5px 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;

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

export default TokenBox
