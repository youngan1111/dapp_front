import { List, ListItem } from "./style";

const Landing = [
  { title: "Ecosystem", link: "ecosystem" },
  { title: "Governance", link: "governance" },
  { title: "Docs", link: "docs" },
  { title: "Developers", link: "developers" },
  { title: "FAQ", link: "FAQ" },
] as const;

/**
 * 랜딩 페이지에서 보이는 네비게이션 바 메뉴 리스트
 */
const LandingList = () => {
  return (
    <List>
      {Landing.map((landing) => (
        <ListItem key={landing.link}>{landing.title}</ListItem>
      ))}
    </List>
  );
};

export default LandingList;
