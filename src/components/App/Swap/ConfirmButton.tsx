import { montserratSemibold } from "@/assets/fonts/Montserrat"
import { useMetamask } from "@/hooks/useMetamask"
import styled from "@emotion/styled"
import QveSwapTx from "src/web3/transactions/QveSwapTx"

const ConfirmButton = ({ itbtInput }) => {
  const { metaAccount } = useMetamask()
  const itbtSwapTx = new QveSwapTx()

  const swapQveToEth = async () => {
    try {
      const response = await itbtSwapTx.swapQveToEth(itbtInput, metaAccount)
    } catch (error) {
      console.error(`error in swapQveEth : ${error}`)
    }
  }

  return (
    <StyledComfirmButton
      onClick={() => {
        swapQveToEth()
        console.log("clicked")
      }}
    >
      Confirm
    </StyledComfirmButton>
  )
}

export default ConfirmButton

const StyledComfirmButton = styled.button`
  width: 100%;
  margin-top: 14px;
  padding: 17px 0;

  border: none;
  border-radius: 8px;
  background: #3568ee;

  color: #fff;
  text-align: center;
  font-family: ${montserratSemibold.style.fontFamily};
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  cursor: pointer;
`
