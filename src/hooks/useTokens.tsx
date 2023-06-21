import { useState, useEffect } from "react"
import axios from "axios"
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { networkState } from "@/recoils/networkState"
import { useRecoilState } from "recoil"
import { useMetamask } from "./useMetamask"
import Web3 from "web3"
import { walletBalance } from "@/recoils/walletBalance"

export interface Token {
  available: number
}

interface Rate {
  APT: USDRate
  USDT: USDRate
}

interface USDRate {
  USD: number
}

/**
 * 내 계좌에 있는 모든 토큰 불러와서 리스트업하는 훅
 * 의존성에 따라서 값이 최신화 됨
 */
export const useTokens = (
  dependency?: any
): [Map<string, Token>, Rate | undefined] => {
  const defualtRate: Rate = {
    APT: {
      USD: 0,
    },
    USDT: {
      USD: 0,
    },
  }
  const [curNet, setCurNet] = useRecoilState(networkState)
  const [tokens, setTokens] = useRecoilState(walletBalance)
  const [rates, setRates] = useState<Rate>(defualtRate)
  const { account, connected } = useWallet()
  const { isConnected, metaAccount } = useMetamask()

  /**
   * aptos available 정리 함수
   */
  const getAvailable = (addr: string) => {
    axios
      .get(
        `https://fullnode.testnet.aptoslabs.com/v1/accounts/${addr}/resources`
      )
      .then((res) => {
        const values: Array<any> = res.data
        values.forEach((value) => {
          const type = value.type
          const cutIdx = type.lastIndexOf("::")
          const regType = type.slice(cutIdx, type.length).replace(/[:>]/g, "")
          if (regType !== "Account") {
            setTokens((prev) =>
              new Map(prev).set(regType, {
                available:
                  Math.floor((Number(value.data.coin.value) / 10 ** 8) * 1e6) /
                  1e6,
              })
            )
          }
        })
      })
      .catch((err) => console.log(err))
  }

  const getSepoliaAvailable = async (addr: string) => {
    axios
      .get(
        `https://api-sepolia.etherscan.io/api?module=account&action=balance&address=${addr}&tag=latest&apikey=${process.env.NEXT_PUBLIC_SEPOLIA_ETHERSCAN_API_KEY}`
      )
      .then(({ data }) => {
        if (data.status === "1") {
          setTokens((prev) =>
            new Map(prev).set("SepoliaETH", {
              available:
                Math.floor((Number(data.result) / 10 ** 18) * 1e6) / 1e6,
            })
          )
        }
      })
      .catch((err) => console.log(err))
  }

  const getRate = () => {
    axios
      .get(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=APT,USDT,USDC,BNB&tsyms=USD&api_key=${process.env.NEXT_PUBLIC_KEY}`
      )
      .then((res) => {
        setRates((prev) => {
          return { ...prev, ...res.data }
        })
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    switch (curNet.name) {
      case "Aptos":
        getAvailable(account?.address!)
        break
      case "Sepolia":
        getSepoliaAvailable(metaAccount!)
        break
      default:
        break
    }
    getRate()
  }, [account, metaAccount, curNet, dependency, isConnected, connected])

  return [tokens, rates!]
}
