import styled from "@emotion/styled";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
  children: React.ReactNode;
}

/**
 * 프로덕트 전반에서 사용되는 하얀 배경 / 그림자 삽입된 공통 프레임
 */
const Frame = ({ children, ...props }: Props) => {
  return <Container {...props}>{children}</Container>;
};

const Container = styled.div`
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  position: relative;
`;

export default Frame;
