import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const LoadingSpinner = ({ ...props }: React.ComponentProps<"div">) => {
  return (
    <LdsRing {...props}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </LdsRing>
  );
};

const ring = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`;

const LdsRing = styled.div`
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
  transform: scale(0.38);

  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    border: 8px solid #e4e4e4;
    border-radius: 50%;
    animation: ${ring} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #e4e4e4 transparent transparent transparent;
  }

  & div:nth-of-type(1) {
    animation-delay: -0.45s;
  }

  & div:nth-of-type(2) {
    animation-delay: -0.3s;
  }

  & div:nth-of-type(3) {
    animation-delay: -0.15s;
  }
`;

export default LoadingSpinner;
