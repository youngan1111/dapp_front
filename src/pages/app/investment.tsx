import TitleBox from "@/components/App/Common/TitleBox"
import { mq, paddings } from "@/components/App/Common/paddings"
import Mint from "@/components/App/Invest/DealBox/Mint"
import Burn from "@/components/App/Invest/DealBox/Burn"
import { css } from "@emotion/react"
import Frame from "@/components/App/Common/Frame"
import styled from "@emotion/styled"

const Deposit = () => {
  return (
    <>
      <InnerContainer>
        <TitleBox title="토큰 deposit 하면 NFT 발급해줌" subtitle="get NFT" />
        <BoxWrapper>
          <Frame css={frameStyle}>
            <Mint />
          </Frame>
          <Frame css={frameStyle}>
            <Burn />
          </Frame>
        </BoxWrapper>
      </InnerContainer>
    </>
  )
}

const frameStyle = css`
  margin-top: 20px;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 20px;
  gap: 20px;

  ${mq[0]} {
    width: 95%;
    padding: 40px 30px;
  }
  ${mq[1]} {
    width: 50%;
  }
  ${mq[3]} {
    width: 477px;
  }
`

const InnerContainer = styled.div`
  width: 100%;
  padding-top: 110px;
  ${paddings};
`

const BoxWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  position: relative;

  ${mq[1]} {
    justify-content: space-between;
    gap: 0px;
  }
`

export default Deposit
