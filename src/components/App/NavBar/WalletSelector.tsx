import { useState, useEffect } from "react";
import { Button, Menu, Typography } from "antd";
import {
  useWallet,
  WalletReadyState,
  WalletName,
} from "@aptos-labs/wallet-adapter-react";
import Wallet from "@/assets/icons/common/wallet-color.svg";
import styled from "@emotion/styled";
import Image from "next/image";
import { truncateAddress } from "./utils";
import { COLOR } from "@/assets/colors";
import { Modal } from "@qve-ui/qds";
import { mq } from "../Common/paddings";

const { Text } = Typography;

/**
 * 로고가 있는 버튼이면 type=logo
 * 없으면 그냥
 */
export function CustomWalletSelector() {
  const [walletSelectorModalOpen, setWalletSelectorModalOpen] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const { connect, disconnect, account, wallets, connected } = useWallet();

  const onWalletButtonClick = () => {
    connected ? disconnect() : setWalletSelectorModalOpen(true);
  };

  const onWalletSelected = (wallet: WalletName<string>) => {
    connect(wallet);
    setWalletSelectorModalOpen(false);
  };

  useEffect(() => {
    if (account && account.ansName) {
      const txt = account.ansName
        ? account.ansName
        : truncateAddress(account.address);
      setButtonText(txt);
    }
  }, [account]);

  return (
    <>
      <CustomButton
        className="wallet-button"
        onClick={() => onWalletButtonClick()}
      >
        <ButtonText>{connected ? buttonText : "Connect Wallet"}</ButtonText>
        <Image
          src={Wallet}
          alt="wallet-logo"
          width={100}
          style={{ width: "18px", height: "auto" }}
        />
      </CustomButton>
      <Modal
        // title={<div className="wallet-modal-title">Connect Wallet</div>}
        // centered
        // open={walletSelectorModalOpen}
        // onCancel={() => setWalletSelectorModalOpen(false)}
        // footer={[]}
        // closable={false}
        isOpen={walletSelectorModalOpen}
        onClose={() => setWalletSelectorModalOpen(false)}
        xButton={true}
      >
        <ModalWrapper>
          {!connected && (
            <Menu>
              {wallets?.map((wallet) => {
                return (
                  <Menu.Item
                    key={wallet.name}
                    onClick={
                      wallet.readyState === WalletReadyState.Installed ||
                      wallet.readyState === WalletReadyState.Loadable
                        ? () => onWalletSelected(wallet.name)
                        : () => window.open(wallet.url)
                    }
                  >
                    <div className="wallet-menu-wrapper">
                      <div className="wallet-name-wrapper">
                        <img
                          src={wallet.icon}
                          width={25}
                          style={{ marginRight: 10 }}
                        />
                        <Text className="wallet-selector-text">
                          {wallet.name}
                        </Text>
                      </div>
                      {wallet.readyState === WalletReadyState.Installed ||
                      wallet.readyState === WalletReadyState.Loadable ? (
                        <Button className="wallet-connect-button">
                          <Text className="wallet-connect-button-text">
                            Connect
                          </Text>
                        </Button>
                      ) : (
                        <Text className="wallet-connect-install">Install</Text>
                      )}
                    </div>
                  </Menu.Item>
                );
              })}
            </Menu>
          )}
        </ModalWrapper>
      </Modal>
    </>
  );
}

const CustomButton = styled.button`
  width: 157px;
  height: 42px;
  border-radius: 15px;
  background-color: ${COLOR.White};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;

const ButtonText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #3a3c61;
`;

const ModalWrapper = styled.div`
  width: 300px;
  padding: 50px 10px;
  border-radius: 50px;
  ${mq[2]} {
    width: 500px;
    padding: 50px 20px;
  }
`;
