import TitleBox from "@/components/App/Common/TitleBox"
import Liquidity from "@/components/App/Swap/Liquidity"
import SwapContainer from "@/components/App/Swap/SwapContainer"
import SwapNav from "@/components/App/Swap/SwapNav"
import styled from "@emotion/styled"
import { useState } from "react"

const Swap = () => {
  const [option, setOption] = useState("Swap")

  const handleSwitchOption = (option: string) => {
    if (option === "Swap") {
      setOption("Swap")
    } else {
      setOption("Liquidity")
    }
  }

  return (
    <>
      <InnerContainer>
        <TitleBox title="토큰 스왑" subtitle="Swap" />
        <SwapNav option={option} handleSwitchOption={handleSwitchOption} />
        {option === "Swap" ? <SwapContainer /> : <Liquidity />}
      </InnerContainer>
    </>
  )
}

export default Swap

const InnerContainer = styled.div`
  width: 450px;
  margin: 0 auto;
  padding-top: 110px;
`
