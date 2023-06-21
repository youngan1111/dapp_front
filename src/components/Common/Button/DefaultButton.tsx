import { buttonStyle } from "./style";

interface Props extends React.ComponentProps<"button"> {
  children: React.ReactNode;
}

/**
 * 그라데이션 및 기본 스타일링이 설정된 버튼.
 * 크기 및 여백은 커스텀이 가능하다
 */
const DefaultButton = ({ children, ...props }: Props) => {
  return (
    <button css={buttonStyle} {...props}>
      {children}
    </button>
  );
};

export default DefaultButton;
