import { useState } from "react";
import Launch from "./Launch";
import Connect from "./Connect";

const BUTTON = [Launch, Connect] as const;

/**
 * 초기 네비바 버튼
 */
const NavbarButton = () => {
  const [state, setState] = useState(0);
  const ButtonContent = BUTTON[state];

  return <ButtonContent />;
};

export default NavbarButton;
