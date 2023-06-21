import { COLOR } from "@/assets/colors";
import { TYPO } from "@/assets/fonts";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
  caption: string;
  title?: string; //큰 글씨
  subtitle?: string; //큰 글씨 하단 작은 글씨
  content?: string; //중간 글씨 (하나만 있음)
  preview?: string; //미리보기 박스에서 사용되는
}

const TextBox = ({
  caption,
  title,
  subtitle,
  content,
  preview,
  ...props
}: Props) => {
  return (
    <Container {...props}>
      <span
        css={css`
          ${TYPO.caption.Reg};
          color: ${COLOR.Label};
        `}
      >
        {caption}
      </span>
      <ContentBox>
        {title ? (
          <>
            <span
              css={css`
                ${TYPO.text3_mon.Bd};
                color: ${COLOR.Gray};
              `}
            >
              {title}
            </span>
            <span
              css={css`
                ${TYPO.text3_mon.Reg};
                color: ${COLOR.Label};
              `}
            >
              {subtitle}
            </span>
          </>
        ) : (
          <span
            css={css`
              ${preview ? TYPO.caption.Bd : TYPO.text3_pre.Bd};
              color: ${COLOR.Gray};
            `}
          >
            {preview ? preview : content}
          </span>
        )}
      </ContentBox>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 5px;
`;

export default TextBox;
