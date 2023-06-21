import { createPortal } from "react-dom";
import PortalOverlay from "./PortalOverlay";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
}

/**
 * 최 상위 태그에서 포탈로 모달을 띄우는 컴포넌트
 * 하위 컴포넌트에 오버레이부터 다 넣어야함
 */
const Portal = ({ children, isOpen }: Props) => {
  return (
    <>
      {isOpen ? (
        createPortal(
          <PortalOverlay>{children}</PortalOverlay>,
          document.querySelector("#portal") as HTMLDivElement
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default Portal;
