import TokenBox from "./TokenBox"
import { Dispatch, SetStateAction } from "react"
import { css } from "@emotion/react"
import { NFTProps } from "./nft"

interface Props {
  tokens: Array<NFTProps>
  choices: Array<string>
  setChoices: Dispatch<SetStateAction<Array<string>>>
}

const TokenSelector = ({ tokens, choices, setChoices }: Props) => {
  return (
    <>
      <TokenBox tokens={tokens} choices={choices} setChoices={setChoices} />
    </>
  )
}

export default TokenSelector
