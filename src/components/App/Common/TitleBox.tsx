import { COLOR } from "@/assets/colors";
import { TYPO } from "@/assets/fonts";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
  title: string;
  subtitle: string;
}

const TitleBox = ({ title, subtitle, ...props }: Props) => {
  return (
    <Container {...props}>
      <span
        css={css`
          ${TYPO.title3.Bd};
          color: ${COLOR.Background};
        `}
      >
        {title}
      </span>
      <span
        css={css`
          ${TYPO.text3_mon.Reg};
          color: #62626d;
        `}
      >
        {subtitle}
      </span>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export default TitleBox;
