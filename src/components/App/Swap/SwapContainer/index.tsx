import styled from "@emotion/styled"
import SwapAmountContainer from "./SwapAmountContainer"
import ConfirmButton from "../ConfirmButton"
import { useMetamask } from "@/hooks/useMetamask"
import QveSwapTx from "src/web3/transactions/QveSwapTx"
import { useState } from "react"

const SwapContainer = () => {
  // written
  const [itbtInput, setQveInput] = useState()
  return (
    <SwapWrapper>
      <SwapAmountContainer
        type="Swap"
        itbtInput={itbtInput}
        setQveInput={setQveInput}
      />
      <ConfirmButton itbtInput={itbtInput} />
    </SwapWrapper>
  )
}

export default SwapContainer

const SwapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`
