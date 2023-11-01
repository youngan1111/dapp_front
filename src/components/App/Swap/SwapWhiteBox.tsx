import styled from "@emotion/styled";

interface SwapWhiteBoxProps {
  children: React.ReactNode;
}

const SwapWhiteBox = ({ children }: SwapWhiteBoxProps) => {
  return <SwapWhiteBoxContainer>{children}</SwapWhiteBoxContainer>;
};

export default SwapWhiteBox;

const SwapWhiteBoxContainer = styled.div`
  width: 100%;
  margin-top: 14px;
  padding: 35px;

  border-radius: 20px;
  background-color: #fff;
`;
