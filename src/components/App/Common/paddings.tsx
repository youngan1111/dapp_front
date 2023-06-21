import { css } from "@emotion/react";

/**
 * 반응형 종단점
 */
export const breakpoints = [425, 1024, 1440, 2560];

/**
 * 반응형 | [태블릿, 작은PC, 일반PC, 대형PCS]
 */
export const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

/**
 * 반응형 좌우 패딩 정도
 */
export const paddings = css`
  padding-right: 20px;
  padding-left: 20px;
  ${mq[0]} {
    padding-right: 40px;
    padding-left: 40px;
  }
  ${mq[1]} {
    padding-right: 80px;
    padding-left: 80px;
  }
  @media (min-width: 1660px) {
    padding-right: 360px;
    padding-left: 360px;
  }
  ${mq[3]} {
    padding-right: 650px;
    padding-left: 650px;
  }
`;
