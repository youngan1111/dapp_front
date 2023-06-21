import Footer from "@/components/App/Footer"
import NavBar from "@/components/App/NavBar"
import styled from "@emotion/styled"

interface Props {
  children: React.ReactNode
}

const Container = ({ children }: Props) => {
  return (
    <Wrapper>
      <NavBar />
      {children}
      <Footer />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f1f3f8;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 80px;
`

export default Container
