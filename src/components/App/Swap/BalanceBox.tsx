import { montserratRegular } from "@/assets/fonts/Montserrat";
import styled from "@emotion/styled";

interface BalanceBoxProps {
  type?: string;
}

const BalanceBox = (props: BalanceBoxProps) => {
  const { type } = props;

  return (
    <BalanceBoxContainer>
      {type === "Swap" ? (
        <BalanceText>$8.86 (0.050%)</BalanceText>
      ) : (
        <BalanceText>$8.86</BalanceText>
      )}
      <BalanceText>Balance 0.000</BalanceText>
    </BalanceBoxContainer>
  );
};

export default BalanceBox;

const BalanceBoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-top: 10px;
`;

const BalanceText = styled.span`
  color: #4a5967;
  /* Lable/medium 1 */
  font-family: ${montserratRegular.style.fontFamily};
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
`;
