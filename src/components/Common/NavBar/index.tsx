import { css } from "@emotion/react";
import NavbarContainer from "./NavbarContainer";

const NavBar = () => {
  return (
    <div
      css={css`
        width: 100%;
        height: 95px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background: rgba(1, 3, 5, 0.55);
        backdrop-filter: blur(8.5px);
        -webkit-backdrop-filter: blur(8.5px);
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 10;
      `}
    >
      <NavbarContainer />
    </div>
  );
};

export default NavBar;
