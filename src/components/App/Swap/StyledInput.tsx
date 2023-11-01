import { montserratBold, montserratSemibold } from "@/assets/fonts/Montserrat"
import styled from "@emotion/styled"
import { useState } from "react"
import IcEth from "@/assets/icons/common/Ic_eth.svg"
import Image from "next/image"

interface StyledInputProps {
  text: string
  setQveInput: (arg0: number) => {}
  qveInput: number
}

const StyledInput = (props: StyledInputProps) => {
  const { text, setQveInput, qveInput } = props
  const [input, setInput] = useState("")

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    if (text == "ITBT") setQveInput(Number(e.target.value))
    console.log(qveInput)
  }

  return (
    <StyledInputBox>
      <StyleInput
        type="number"
        value={text == "ITBT" ? qveInput : qveInput}
        placeholder="0.00"
        onChange={onChange}
        disabled={text == "ETH" && true}
      />
      <TokenBox>
        <Image src={IcEth} alt="eth" />
        <TokenText>{text}</TokenText>
      </TokenBox>
    </StyledInputBox>
  )
}

export default StyledInput

const StyledInputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-bottom: 16px;
  padding: 24px;

  border-radius: 20px;
  border: 1px solid #d1d1d1;
`
const StyleInput = styled.input`
  width: 80%;

  border: none;
  color: #15151a;

  font-family: ${montserratBold.style.fontFamily};
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;

  outline: none;
`

const TokenBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 7px 20px 7px 7px;

  border-radius: 20px;
  background-color: #f8f8fb;
`

const TokenImage = styled.div`
  width: 26px;
  height: 26px;

  border-radius: 50%;
  background-color: white;
`

const TokenText = styled.span`
  color: #09090a;
  /* Body text/Large 1 */
  font-family: ${montserratSemibold.style.fontFamily};
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`
