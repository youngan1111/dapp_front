import { css } from "@emotion/react";
import { montserratSemibold, montserratRegular } from "./Montserrat";
import { pretendardSemibold, pretendardRegular } from "./Pretendard";
import { SerializedStyles } from "@emotion/react";

/**
 * 폰트 토큰을 모아둔 저장소입니다.
 * emotion에 바로 적용해서 사용할 수 있습니다.
 */

const breakpoints = [320, 375, 425, 768, 1024, 1440, 2560];
const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

// 여기부터 아래는 앱 토큰
export const TEXT_STYLE_SIZE = {
  title1: "title1",
  title2: "title2",
  title3: "title3",
  text1_mon: "text1_mon",
  text2_mon: "text2_mon",
  text3_mon: "text3_mon",
  text1_pre: "text1_pre",
  text2_pre: "text2_pre",
  text3_pre: "text3_pre",
  caption: "caption",
  label: "label",
} as const;

export type TextStyleSize =
  (typeof TEXT_STYLE_SIZE)[keyof typeof TEXT_STYLE_SIZE];

export const TEXT_STYLE_WEIGHT = {
  Bd: "Bd",
  Reg: "Reg",
} as const;

export type TextStyleWeight =
  (typeof TEXT_STYLE_WEIGHT)[keyof typeof TEXT_STYLE_WEIGHT];

const Title1 = css`
  font-size: 30px;
  ${mq[0]} {
    font-size: 32px;
  }
  ${mq[1]} {
    font-size: 34px;
  }
  ${mq[2]} {
    font-size: 36px;
  }
  ${mq[3]} {
    font-size: 40px;
  }
  ${mq[4]} {
    font-size: 44px;
  }
  ${mq[5]} {
    font-size: 48px;
  }
  ${mq[6]} {
    font-size: 60px;
  }
`;

const Title2 = css`
  font-size: 24px;
  ${mq[0]} {
    font-size: 26px;
  }
  ${mq[1]} {
    font-size: 28px;
  }
  ${mq[2]} {
    font-size: 30px;
  }
  ${mq[3]} {
    font-size: 32px;
  }
  ${mq[4]} {
    font-size: 36px;
  }
  ${mq[5]} {
    font-size: 40px;
  }
  ${mq[6]} {
    font-size: 50px;
  }
`;

const Title3 = css`
  font-size: 16px;
  ${mq[0]} {
    font-size: 17px;
  }
  ${mq[1]} {
    font-size: 18px;
  }
  ${mq[2]} {
    font-size: 18px;
  }
  ${mq[3]} {
    font-size: 20px;
  }
  ${mq[4]} {
    font-size: 20px;
  }
  ${mq[5]} {
    font-size: 24px;
  }
  ${mq[6]} {
    font-size: 30px;
  }
`;

const Text1 = css`
  font-size: 14px;
  ${mq[0]} {
    font-size: 15px;
  }
  ${mq[1]} {
    font-size: 15px;
  }
  ${mq[2]} {
    font-size: 16px;
  }
  ${mq[3]} {
    font-size: 16px;
  }
  ${mq[4]} {
    font-size: 17px;
  }
  ${mq[5]} {
    font-size: 18px;
  }
  ${mq[6]} {
    font-size: 20px;
  }
`;

const Text2 = css`
  font-size: 13px;
  ${mq[0]} {
    font-size: 14px;
  }
  ${mq[1]} {
    font-size: 14px;
  }
  ${mq[2]} {
    font-size: 14px;
  }
  ${mq[3]} {
    font-size: 15px;
  }
  ${mq[4]} {
    font-size: 15px;
  }
  ${mq[5]} {
    font-size: 16px;
  }
  ${mq[6]} {
    font-size: 18px;
  }
`;

const Text3 = css`
  font-size: 12px;
  ${mq[0]} {
    font-size: 13px;
  }
  ${mq[1]} {
    font-size: 13px;
  }
  ${mq[2]} {
    font-size: 13px;
  }
  ${mq[3]} {
    font-size: 14px;
  }
  ${mq[4]} {
    font-size: 14px;
  }
  ${mq[5]} {
    font-size: 15px;
  }
  ${mq[6]} {
    font-size: 15px;
  }
`;

const Caption = css`
  font-size: 10px;
  ${mq[3]} {
    font-size: 11px;
  }
`;

const Label = css`
  font-size: 8px;
  ${mq[4]} {
    font-size: 9px;
  }
`;

/**
 * 2560 이상에서 유동적인 폰트 디자인 토큰
 */
const TYPO: Record<
  TextStyleSize,
  Partial<Record<TextStyleWeight, SerializedStyles>>
> = {
  [TEXT_STYLE_SIZE.title1]: {
    [TEXT_STYLE_WEIGHT.Bd]: css`
      font-family: ${montserratSemibold.style.fontFamily};
      ${Title1};
      font-weight: 600;
    `,
    [TEXT_STYLE_WEIGHT.Reg]: css`
      font-family: ${montserratRegular.style.fontFamily};
      ${Title1}
      font-weight: 400;
    `,
  },
  [TEXT_STYLE_SIZE.title2]: {
    [TEXT_STYLE_WEIGHT.Bd]: css`
      font-family: ${montserratSemibold.style.fontFamily};
      ${Title2};
      font-weight: 600;
    `,
    [TEXT_STYLE_WEIGHT.Reg]: css`
      font-family: ${montserratRegular.style.fontFamily};
      ${Title2};
      font-weight: 400;
    `,
  },
  [TEXT_STYLE_SIZE.title3]: {
    [TEXT_STYLE_WEIGHT.Bd]: css`
      font-family: ${montserratSemibold.style.fontFamily};
      ${Title3};
      font-weight: 600;
    `,
    [TEXT_STYLE_WEIGHT.Reg]: css`
      font-family: ${montserratRegular.style.fontFamily};
      ${Title3};
      font-weight: 400;
    `,
  },
  [TEXT_STYLE_SIZE.text1_mon]: {
    [TEXT_STYLE_WEIGHT.Bd]: css`
      font-family: ${montserratSemibold.style.fontFamily};
      ${Text1};
      font-weight: 600;
    `,
    [TEXT_STYLE_WEIGHT.Reg]: css`
      font-family: ${montserratRegular.style.fontFamily};
      ${Text1};
      font-weight: 400;
    `,
  },
  [TEXT_STYLE_SIZE.text2_mon]: {
    [TEXT_STYLE_WEIGHT.Bd]: css`
      font-family: ${montserratSemibold.style.fontFamily};
      ${Text2};
      font-weight: 600;
    `,
    [TEXT_STYLE_WEIGHT.Reg]: css`
      font-family: ${montserratRegular.style.fontFamily};
      ${Text2};
      font-weight: 400;
    `,
  },
  [TEXT_STYLE_SIZE.text3_mon]: {
    [TEXT_STYLE_WEIGHT.Bd]: css`
      font-family: ${montserratSemibold.style.fontFamily};
      ${Text3};
      font-weight: 600;
    `,
    [TEXT_STYLE_WEIGHT.Reg]: css`
      font-family: ${montserratRegular.style.fontFamily};
      ${Text3};
      font-weight: 400;
    `,
  },
  [TEXT_STYLE_SIZE.text1_pre]: {
    [TEXT_STYLE_WEIGHT.Bd]: css`
      font-family: ${pretendardSemibold.style.fontFamily};
      ${Text1}
      font-weight: 600;
    `,
    [TEXT_STYLE_WEIGHT.Reg]: css`
      font-family: ${pretendardRegular.style.fontFamily};
      ${Text1};
      font-weight: 400;
    `,
  },
  [TEXT_STYLE_SIZE.text2_pre]: {
    [TEXT_STYLE_WEIGHT.Bd]: css`
      font-family: ${pretendardSemibold.style.fontFamily};
      ${Text2};
      font-weight: 600;
    `,
    [TEXT_STYLE_WEIGHT.Reg]: css`
      font-family: ${pretendardRegular.style.fontFamily};
      ${Text2};
      font-weight: 400;
    `,
  },
  [TEXT_STYLE_SIZE.text3_pre]: {
    [TEXT_STYLE_WEIGHT.Bd]: css`
      font-family: ${pretendardSemibold.style.fontFamily};
      ${Text3};
      font-weight: 600;
    `,
    [TEXT_STYLE_WEIGHT.Reg]: css`
      font-family: ${pretendardRegular.style.fontFamily};
      ${Text3};
      font-weight: 400;
    `,
  },
  [TEXT_STYLE_SIZE.caption]: {
    [TEXT_STYLE_WEIGHT.Bd]: css`
      font-family: ${pretendardSemibold.style.fontFamily};
      ${Caption};
      font-weight: 600;
    `,
    [TEXT_STYLE_WEIGHT.Reg]: css`
      font-family: ${pretendardRegular.style.fontFamily};
      ${Caption};
      font-weight: 400;
    `,
  },
  [TEXT_STYLE_SIZE.label]: {
    [TEXT_STYLE_WEIGHT.Bd]: css`
      font-family: ${pretendardSemibold.style.fontFamily};
      ${Label};
      font-weight: 600;
    `,
    [TEXT_STYLE_WEIGHT.Reg]: css`
      font-family: ${pretendardRegular.style.fontFamily};
      ${Label};
      font-weight: 400;
    `,
  },
};

export { TYPO };
