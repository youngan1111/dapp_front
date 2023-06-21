import { atom } from "recoil"
import Aptos from "@/assets/icons/token/aptos.svg"
import Near from "@/assets/icons/token/near.svg"
import Ethereum from "@/assets/icons/token/ethereum.svg"
import BNB from "@/assets/icons/token/bnb.svg"

export interface Network {
  name: string
  color: string
  img: string
  token: string
}

export const NETWORKS: Array<Network> = [
  {
    name: "Sepolia",
    color: "#000000",
    img: Ethereum,
    token: "ETH",
  },
  {
    name: "Aptos",
    color: "#000000",
    img: Aptos,
    token: "APT",
  },
  {
    name: "Ethereum",
    color: "#000000",
    img: Ethereum,
    token: "ETH",
  },
]

export const networkState = atom<Network>({
  key: "networkState",
  default: NETWORKS[0],
})
