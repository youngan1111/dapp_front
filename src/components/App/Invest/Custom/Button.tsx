import { COLOR } from "@/assets/colors";
import { TYPO } from "@/assets/fonts";
import styled from "@emotion/styled";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"button"> {
  title: string;
  isActive: boolean;
}

const CustomButton = ({ title, isActive, ...props }: Props) => {
  return (
    <Button isActive={isActive} {...props}>
      {title}
    </Button>
  );
};

const Button = styled.button<{ isActive: boolean }>`
  width: 100%;
  height: 52px;
  border-radius: 20px;
  background-color: ${(props) => (props.isActive ? COLOR.Blue : COLOR.Label)};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLOR.White};
  ${TYPO.text3_mon.Bd};
  border: none;
  cursor: pointer;
`;

export default CustomButton;
