import { css } from "@emotion/react";
import { TYPO } from "@/assets/fonts";
import { COLOR } from "@/assets/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import Telegram from "@/assets/icons/logo/telegram.svg";

/**
 * 푸터 컴포넌트
 */
const Footer = () => {
  return (
    <div css={container}>
      <div css={textWrapper}>
        <span
          css={css`
            ${TYPO.caption.Reg};
            color: ${COLOR.Label};
          `}
        >
          <span css={TYPO.caption.Bd}>Blockwave Labs</span>
          <span> | contact@blockwavelabs.io</span>
        </span>
        <span
          css={css`
            ${TYPO.caption.Reg};
            color: ${COLOR.Label};
          `}
        >
          Blockwave Labs Inc. All rights reserved
        </span>
      </div>
      <div css={iconWrapper}>
        <FontAwesomeIcon icon={faDiscord} color={COLOR.Label} />
        <FontAwesomeIcon icon={faTwitter} color={COLOR.Label} />
        <Image
          src={Telegram}
          height={20}
          style={{ height: 20, width: "auto" }}
          alt="telegram"
        />
      </div>
    </div>
  );
};

const container = css`
  width: 100%;
  height: 134px;
  background-color: #121214;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const textWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const iconWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
  font-size: 20px;
`;

export default Footer;
