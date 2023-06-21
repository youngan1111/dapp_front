import { css } from "@emotion/react";
import Image from "next/image";
import Logo from "@/assets/icons/logo/logo-white.svg";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavbarButton from "./NavbarButton";
import { LandingList, MainList } from "./NavbarList";

/**
 * 랜딩페이지와 나머지 페이지로 네비바가 크게 구분됨
 */
export enum NAVTYPE {
  LANDING,
  CONNECTING,
}

const NavbarContainer = () => {
  const { pathname } = useRouter();
  const [type, setType] = useState(NAVTYPE.LANDING);

  useEffect(() => {
    setType(pathname === "/" ? NAVTYPE.LANDING : NAVTYPE.CONNECTING);
  }, [pathname]);

  return (
    <div css={navbarContainer}>
      <div css={wrapper}>
        <Image
          src={Logo}
          alt="qve-logo"
          width={31}
          height={28}
          style={{ cursor: "pointer" }}
        />
        {type === NAVTYPE.CONNECTING && <MainList />}
      </div>
      <div css={wrapper}>
        {type === NAVTYPE.LANDING && <LandingList />}
        <NavbarButton />
      </div>
    </div>
  );
};

const navbarContainer = css`
  width: 80%;
  max-width: 1200px;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const wrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 35px;
`;

export default NavbarContainer;
