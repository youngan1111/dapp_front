import { COLOR } from "@/assets/colors";
import { TYPO } from "@/assets/fonts";
import styled from "@emotion/styled";

const List = styled.ul`
  list-style-type: none;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 35px;
`;

const ListItem = styled.li`
  ${TYPO.text2_mon.Reg};
  color: #ffffffe7;
  letter-spacing: 2%;
  line-height: 12px;
  cursor: pointer;
  transition: 0.15s;

  &:hover {
    color: ${COLOR.White};
  }
`;

export { List, ListItem };
