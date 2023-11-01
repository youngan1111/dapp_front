import styled from "@emotion/styled"
import SwapAmountContainer from "../SwapContainer/SwapAmountContainer"
import ConfirmButton from "../ConfirmButton"
import PairBox from "./PairBox"

const Liquidity = () => {
  return (
    <LiquidityContainer>
      <PairBox />
      <SwapAmountContainer type="liquidity" />
      <ConfirmButton />
    </LiquidityContainer>
  )
}

export default Liquidity

const LiquidityContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`
