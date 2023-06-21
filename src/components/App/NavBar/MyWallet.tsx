import styled from "@emotion/styled";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { COLOR } from "@/assets/colors";
import MyAsset from "./MyAsset";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { truncateAddress } from "./utils";

interface Props {
  mobile?: boolean;
}

/**
 * 지갑이 연동된 상태에서 내 지갑 확인할 수 있는 버튼
 */
const MyWallet = ({ mobile }: Props) => {
  const { wallets, account } = useWallet();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setIsOpen(false));

  return (
    <ContainerWrapper ref={ref}>
      <Container onClick={() => (!mobile ? setIsOpen((prev) => !prev) : null)}>
        <Image
          src={wallets[0].icon}
          alt="petra-wallet"
          width={20}
          height={20}
          style={{ width: "20px", height: "auto" }}
        />
        <ButtonText>{truncateAddress(account?.address!)}</ButtonText>
      </Container>
      {isOpen ? <MyAsset walletName="Petra Wallet" /> : <></>}
    </ContainerWrapper>
  );
};

const ContainerWrapper = styled.div`
  position: relative;
`;

const Container = styled.button`
  width: 130px;
  height: 42px;
  border-radius: 15px;
  background-color: ${COLOR.White};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: none;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;

const ButtonText = styled.span`
  font-weight: 600;
  color: #3a3c61;
`;

export default MyWallet;
