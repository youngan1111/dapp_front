import styled from "@emotion/styled"
import SwapWhiteBox from "../SwapWhiteBox"
import { montserratMedium, montserratSemibold } from "@/assets/fonts/Montserrat"
import IcEth from "@/assets/icons/common/Ic_eth.svg"
import Image from "next/image"

const PairBox = () => {
  return (
    <SwapWhiteBox>
      <PairTitleBox>Liquidity Pair</PairTitleBox>
      <PairTokenWrapper>
        <PairTokenBox>
          <PairTokenImage />
          <PairTokenText>ITBT</PairTokenText>
        </PairTokenBox>
        <PairTokenBox>
          <Image src={IcEth} alt="eth" />
          <PairTokenText>ETH</PairTokenText>
        </PairTokenBox>
      </PairTokenWrapper>
    </SwapWhiteBox>
  )
}

export default PairBox

const PairTitleBox = styled.div`
  width: 100%;
  margin-bottom: 16px;

  color: #33343e;

  /* Body text/Large 2 */
  font-family: ${montserratSemibold.style.fontFamily};
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  text-align: center;
`

const PairTokenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;

  width: 100%;
`

const PairTokenBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 9px 54px;

  width: 50%;

  border-radius: 20px;
  background: #f8f8fb;
`

const PairTokenImage = styled.div`
  width: 22px;
  height: 22px;

  border-radius: 50%;
  background-color: #bababa;
`

const PairTokenText = styled.span`
  color: #33343e;

  /* Body text/Large 2 */
  font-family: ${montserratSemibold.style.fontFamily};
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`

const FeeBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-top: 16px;

  color: #33343e;
  /* Body text/small 1 */
  font-family: ${montserratMedium.style.fontFamily};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 25px;
`
