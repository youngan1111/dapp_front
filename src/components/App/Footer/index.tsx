import { css } from "@emotion/react"
import { TYPO } from "@/assets/fonts"
import { COLOR } from "@/assets/colors"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons"
import Image from "next/image"
import Telegram from "@/assets/icons/logo/telegram-gray.svg"
import { paddings } from "../Common/paddings"

const Footer = () => {
  return (
    <div css={container}>
      <div css={textWrapper}>
        <span
          css={css`
            ${TYPO.caption.Reg};
            color: ${COLOR.Gray};
          `}
        >
          <span css={TYPO.caption.Bd}>정영안</span>
          <span> | youngan.jung@gmail.com</span>
        </span>
        <span
          css={css`
            ${TYPO.caption.Reg};
            color: ${COLOR.Gray};
          `}
        >
          Graduation Project
        </span>
      </div>
      <div css={iconWrapper}>
        <FontAwesomeIcon icon={faDiscord} color={COLOR.Gray} />
        <FontAwesomeIcon icon={faTwitter} color={COLOR.Gray} />
        <Image
          src={Telegram}
          height={20}
          style={{ height: 20, width: "auto" }}
          alt="telegram"
        />
      </div>
    </div>
  )
}

const container = css`
  width: 100%;
  ${paddings};
  display: flex;
  height: 134px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const textWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`

const iconWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
  font-size: 20px;
`

export default Footer
