import { ButtonTitle } from "./style";
import ConnectIcon from "@/assets/icons/common/wallet.svg";
import Image from "next/image";
import { DefaultButton } from "../../Button";

/**
 * 페트라가 설치된 상황에서, 지갑 연결이 안된 경우
 */
const Connect = () => {
  return (
    <DefaultButton>
      <ButtonTitle>Connect</ButtonTitle>
      <Image
        src={ConnectIcon}
        alt="connect-wallet"
        width={17}
        style={{ width: "auto", height: "auto" }}
      />
    </DefaultButton>
  );
};

export default Connect;
