import { COLOR } from "@/assets/colors";
import { TYPO } from "@/assets/fonts";
import styled from "@emotion/styled";
import { ComponentProps } from "react";
import { CATEGORIES } from ".";

interface Props extends ComponentProps<"div"> {
  curCategory: string;
  setCurCategory: (idx: number) => void;
}

/**
 * Mint / Burn 선택 박스
 */
const Categories = ({ curCategory, setCurCategory, ...props }: Props) => {
  return (
    <CategoryContainer {...props}>
      {CATEGORIES.map((category, idx) => (
        <Title
          onClick={() => setCurCategory(idx)}
          clicked={category.name === curCategory}
          key={category.name}
        >
          {category.name}
        </Title>
      ))}
      <Background clicked={curCategory === CATEGORIES[0].name} />
    </CategoryContainer>
  );
};

const CategoryContainer = styled.div`
  width: 140px;
  border-radius: 500px;
  padding: 10px 17.5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  background-color: ${COLOR.LightGray};
`;

const Title = styled.span<{ clicked: boolean }>`
  ${TYPO.text3_mon.Bd};
  color: ${(props) => (props.clicked ? COLOR.White : COLOR.Label)};
  position: relative;
  z-index: 3;
  cursor: pointer;
`;

const Background = styled.div<{ clicked: boolean }>`
  width: 50%;
  height: 100%;
  border-radius: 500px;
  position: absolute;
  z-index: 1;
  top: 50%;
  left: ${(props) => (props.clicked ? "0px" : "50%")};
  transform: translateY(-50%);
  transition: all 0.3s ease-in-out;
  background-color: ${COLOR.DarkBlue};
`;

export default Categories;
