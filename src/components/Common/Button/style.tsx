import { css } from "@emotion/react";
import { COLOR } from "@/assets/colors";

/**
 * 그라데이션이 적용된 버튼.
 * 좌우 패딩과 높이는 기본 설정 되어있으나, 너비 및 상하 패딩은 커스텀하여 삽입하여야함.
 */
const buttonStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border: none;
  border-radius: 17px;
  background: ${COLOR.Gradient};
  height: 45px;
  padding: 0px 22px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    transform: scale(1.005);
  }
  &:active {
    transform: scale(0.99);
  }
`;

export { buttonStyle };
