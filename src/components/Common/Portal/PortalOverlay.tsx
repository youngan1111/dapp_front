import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

interface Props {
  children: React.ReactNode;
}

const PortalOverlay = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

const overlayAnimation = keyframes`
    from {
        opacity: 0;
        top: -15px;
    }
    to {
        opacity: 1;
        top: 0px;
    }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #0000004f;
  position: fixed;
  top: 0px;
  left: 0px;
  display: flex;
  align-items: center;
  justify-content: center;

  animation: ${overlayAnimation} 0.2s ease-in-out;
`;

export default PortalOverlay;
