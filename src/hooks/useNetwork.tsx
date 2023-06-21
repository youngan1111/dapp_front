import { networkState } from "@/recoils/networkState"
import { useRecoilState } from "recoil"
import { APTOS_TOKENS, SEPOLIA_TOKENS, TokenInfo } from "@/assets/tokens"
import { useEffect, useState } from "react"
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { useMetamask } from "./useMetamask"

export const useNetwork = () => {
  const [curNet, setCurNet] = useRecoilState(networkState)
  const { connected } = useWallet()
  const { isConnected } = useMetamask()
  const [TOKENS, setTOKENS] = useState<Array<TokenInfo>>(SEPOLIA_TOKENS)
  const [online, setOnline] = useState(false)

  useEffect(() => {
    switch (curNet.name) {
      case "Aptos":
        setTOKENS(APTOS_TOKENS)
        connected ? setOnline(true) : setOnline(false)
        break
      case "Ethereum":
        isConnected ? setOnline(true) : setOnline(false)
        break
      case "Sepolia":
        setTOKENS(SEPOLIA_TOKENS)
        isConnected ? setOnline(true) : setOnline(false)
        break
      default:
        break
    }
  }, [curNet, connected, isConnected])

  return { TOKENS, online, curNet }
}
