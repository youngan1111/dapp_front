import { COLOR } from "@/assets/colors"
import { TYPO } from "@/assets/fonts"
import styled from "@emotion/styled"
import Image from "next/image"
import { ComponentProps, useState } from "react"
import { css } from "@emotion/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import LoadingSpinner from "@/components/Common/LoadingSpinner"
import { TokenInfo } from "@/assets/tokens"
import { Modal } from "@qve-ui/qds"
import TokenSelectorModal from "./TokenSelectorModal"
import { walletBalance } from "@/recoils/walletBalance"
import { useRecoilState } from "recoil"
import { thousandSeparator } from "@/utils/thousandSeparator"

interface Props extends ComponentProps<"input"> {
  isMax: boolean
  onMax: () => void
  result: number
  loading: boolean
  curToken: TokenInfo
  setToken: (token: TokenInfo) => void
  minting: boolean
}

const CustomInput = ({
  isMax,
  onMax,
  result,
  loading,
  curToken,
  setToken,
  minting,
  ...props
}: Props) => {
  const [modal, setModal] = useState(false)
  const [tokens, setTokens] = useRecoilState(walletBalance)

  return (
    <Container>
      <TokenSelector onClick={() => setModal((prev) => !prev)}>
        <Image src={curToken.img} width={24} height={24} alt="apt" />
        <span
          css={css`
            ${TYPO.text2_mon.Bd};
            color: ${COLOR.Background};
          `}
        >
          {curToken.title}
        </span>
        <FontAwesomeIcon
          icon={faChevronDown}
          css={css`
            ${TYPO.text2_mon.Bd};
            color: ${COLOR.Background};
          `}
        />
      </TokenSelector>

      <span>
        잔여:{" "}
        {tokens.get(curToken.title) === undefined ? (
          <LoadingWrapper>
            <LoadingSpinner style={{ transform: "scale(0.3)" }} />
          </LoadingWrapper>
        ) : (
          <>{thousandSeparator(tokens.get(curToken.title)?.available!)}</>
        )}
      </span>

      <InputWrapper>
        <Input
          placeholder="Input Amount!"
          isFixed={minting}
          disabled={minting}
          {...props}
        />
        {loading ? (
          <LoadingWrapper>
            <LoadingSpinner style={{ transform: "scale(0.3)" }} />
          </LoadingWrapper>
        ) : (
          <Available>${result}</Available>
        )}
      </InputWrapper>
      <MaxButton
        isMax={isMax}
        minting={minting}
        onClick={() => onMax()}
        disabled={minting}
      >
        MAX
      </MaxButton>

      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <TokenSelectorModal
          curToken={curToken}
          setToken={setToken}
          onClose={() => setModal(false)}
        />
      </Modal>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 78px;
  border-radius: 8px;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
`

const TokenSelector = styled.div`
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background-color: #7474742a;
  }
`

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 5px;
  margin-right: 10px;
`

const Input = styled.input<{ isFixed: boolean }>`
  ${TYPO.text1_mon.Bd};
  width: 100%;
  height: 50%;
  text-align: end;
  border: none;
  background: none;
  outline: none;
  color: ${(props) => (props.isFixed ? COLOR.Label : COLOR.Gray)};

  &::placeholder {
    ${TYPO.text1_mon.Reg};
    color: ${COLOR.Label};
  }
`

const Available = styled.span`
  ${TYPO.caption.Reg};
  color: ${COLOR.Label};
  text-align: end;
`

const MaxButton = styled.button<{ isMax: boolean; minting: boolean }>`
  ${TYPO.caption.Bd};
  color: ${COLOR.White};
  background-color: ${(props) =>
    props.isMax || props.minting ? COLOR.Label : COLOR.Gray};
  padding: 7px 13px;
  border-radius: 20px;
  cursor: pointer;
  border: none;
`

const LoadingWrapper = styled.div`
  width: 13px;
  height: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-right: 20px;
`

export { InputWrapper, Input, Available, MaxButton, LoadingWrapper }
export default CustomInput
