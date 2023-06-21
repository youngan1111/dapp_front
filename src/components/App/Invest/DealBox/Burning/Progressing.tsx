import styled from "@emotion/styled"
import { useEffect } from "react"

interface Props {
  onNext: () => void
}

const Progressing = ({ onNext }: Props) => {
  useEffect(() => {
    setTimeout(() => {
      onNext()
    }, 3000)
  }, [])

  return <Container></Container>
}

const Container = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default Progressing
