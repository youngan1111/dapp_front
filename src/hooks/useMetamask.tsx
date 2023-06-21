import { metaState } from "@/recoils/metamask";
import { useMetaMask } from "metamask-react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const networks = {
  mainnet: "0x1", // 1
  // Test nets
  goerli: "0x5", // 5
  ropsten: "0x3", // 3
  rinkeby: "0x4", // 4
  kovan: "0x2a", // 42
  mumbai: "0x13881", // 80001
  sepolia: "0xaa36a7", // 11155111
  // Layers 2
  arbitrum: "0xa4b1", // 42161
  optimism: "0xa", // 10
  // Side chains
  polygon: "0x89", // 137
  gnosisChain: "0x64", // 100
  // Alt layer 1
  binanceSmartChain: "0x38", // 56
  avalanche: "0xa86a", // 43114
  cronos: "0x19", // 25
  fantom: "0xfa", // 250
};

/**
 * 메타마스크 관련 커스텀 훅 (라이브러리 오버라이딩함)
 */
export const useMetamask = () => {
  const { status, connect, addChain, account, chainId, switchChain } =
    useMetaMask();
  const [meta, setMeta] = useRecoilState(metaState);

  const isConnected = meta.connected;

  const onConnect = (net: keyof typeof networks) => {
    if (status === "connected" && chainId !== networks[net])
      switchChain(networks[net]).catch((err) => {
        setMeta({ connected: false, net: "" });
      });

    connect()
      .then((res) => {
        if (net === "binanceSmartChain") {
          const bnbChainParams = {
            chainId: networks.binanceSmartChain,
            chainName: "Binance Smart Chain",
            rpcUrls: ["https://bsc-dataseed.binance.org/"],
            nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18,
            },
            blockExplorerUrls: ["https://bscscan.com/"],
          };
          addChain(bnbChainParams).then((res) => {
            setMeta({ connected: true, net: networks.binanceSmartChain });
          });
        } else if (net === "sepolia") {
          setMeta({ connected: true, net: networks.sepolia });
        } else {
          setMeta({ connected: true, net: networks.mainnet });
        }
      })
      .catch((err) => {
        setMeta({ connected: false, net: "" });
      });
  };

  const onDisconnect = () => {
    setMeta({ connected: false, net: "" });
  };

  useEffect(() => {
    switch (status) {
      case "connected":
        // setMeta({ connected: true, net: chainId });
        break;
      case "notConnected":
        setMeta({ connected: false, net: "" });
        break;
    }
  }, [status]);

  return {
    isConnected: isConnected,
    onConnect: onConnect,
    onDisconnect: onDisconnect,
    metaAccount: account,
  };
};
