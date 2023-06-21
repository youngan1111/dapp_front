import { css } from "@emotion/react";

interface Props extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}

/**
 * 글래스 모피즘이 적용된 박스
 */
const GlassBox = ({ children, ...props }: Props) => {
  return (
    <div css={glassStyle} {...props}>
      {children}
    </div>
  );
};

const glassStyle = css`
  background: radial-gradient(
    127.94% 127.94% at -13.78% -12.94%,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(15px);
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #636363;
  position: relative;
`;

export default GlassBox;
