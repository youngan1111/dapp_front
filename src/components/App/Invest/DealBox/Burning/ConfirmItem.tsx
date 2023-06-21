import styled from "@emotion/styled";
import NFT from "@/assets/icons/token/nft.svg";
import Image from "next/image";
import { css } from "@emotion/react";
import { TYPO } from "@/assets/fonts";
import { COLOR } from "@/assets/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import TextBox from "./TextBox";
import { mq } from "@/components/App/Common/paddings";
import { NFTProps, truncateId } from "./nft";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
  token: NFTProps;
}

const ConfirmItem = ({ token, ...props }: Props) => {
  return (
    <Container {...props}>
      <TokenWrapper>
        <Image src={NFT} alt="nft" width={58} height={58} css={logoCss} />
        <TitleBox>
          <span
            css={css`
              ${TYPO.text2_mon.Bd};
              color: ${COLOR.Gray};
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: flex-start;
              gap: 8px;
            `}
          >
            {token.tName}
            <FontAwesomeIcon
              icon={faArrowUp}
              css={css`
                color: ${COLOR.Gray};
                transform: rotate(45deg);
              `}
            />
          </span>
          <span
            css={css`
              ${TYPO.text3_mon.Reg};
              color: ${COLOR.Label};
            `}
          >
            {token.principal}
          </span>
        </TitleBox>
      </TokenWrapper>
      <InfoWrapper>
        <TextBox caption={"Token ID"} preview={truncateId(token.tID)} />
        <TextBox caption={"Creation Date"} preview={token.creationDtae} />
      </InfoWrapper>
      <FoundationWrapper>
        <span
          css={css`
            ${TYPO.caption.Reg};
            color: ${COLOR.Gray};
          `}
        >
          {token.foundation}
        </span>
        <Image src={token.fLogo} alt="klaytn" width={15} height={14} />
      </FoundationWrapper>
    </Container>
  );
};

const logoCss = css`
  width: 45px;
  height: 45px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 10px;
  ${mq[2]} {
    width: 58px;
    height: 58px;
    border-radius: 20px;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  gap: 10px;
  position: relative;
  cursor: default;
  transition: all 0.2s;
`;

const TokenWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
`;

const TitleBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
`;

const InfoWrapper = styled.div`
  width: 55%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 5px;
  margin-left: 60px;
  ${mq[0]} {
    width: 60%;
  }
  ${mq[2]} {
    margin-left: 73px;
  }
`;

const FoundationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
  position: absolute;
  bottom: 20px;
  right: 15px;
`;

export default ConfirmItem;
