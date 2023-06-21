import Image from "next/image";
import Arrow from "@/assets/icons/common/arrow.svg";
import { ButtonTitle } from "./style";
import { DefaultButton } from "../../Button";
import { useRouter } from "next/router";

/**
 * 앱 페이지로 이동하는 버튼
 */
const Launch = () => {
  const router = useRouter();

  return (
    <DefaultButton onClick={() => router.push("/app/investment")}>
      <ButtonTitle>Launch App</ButtonTitle>
      <Image
        src={Arrow}
        alt="launch-app"
        width={16.28}
        style={{ width: "auto", height: "auto", transform: "rotate(-45deg)" }}
      />
    </DefaultButton>
  );
};

export default Launch;
