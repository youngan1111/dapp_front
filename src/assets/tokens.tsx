import Apt from "@/assets/icons/token/aptos-black.svg"
import Eth from "@/assets/icons/token/ethereumBlack.svg"
import Usdt from "@/assets/icons/token/UsdtIcon.png"
import { StaticImageData } from "next/image"

export interface TokenInfo {
  fullName: string
  title: string
  img: StaticImageData
  tokenAddress: string
}

export const APTOS_TOKENS: Array<TokenInfo> = [
  {
    fullName: "AptosCoin",
    title: "APT",
    img: Apt,
    tokenAddress: "",
  },
  {
    fullName: "DevnetUSDT",
    title: "USDT",
    img: Usdt,
    tokenAddress: "",
  },
]

export const SEPOLIA_TOKENS: Array<TokenInfo> = [
  {
    fullName: "Ethereum",
    title: "ETH",
    img: Eth,
    tokenAddress: process.env.NEXT_PUBLIC_ETHEREUM_TOKEN_ADDRESS!,
  },
  {
    fullName: "TestnetUSDT",
    title: "USDT",
    img: Usdt,
    tokenAddress: process.env.NEXT_PUBLIC_TETHER_TOKEN_ADDRESS!,
  },
]
