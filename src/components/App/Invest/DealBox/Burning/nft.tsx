import Klaytn from "@/assets/icons/token/KlaytnLogo.svg"

//NFT 관련 인터페이스
export interface NFTProps {
  tName: string
  principal: string
  tID: string
  creationDtae: string
  foundation: string
  fLogo: string
  deposit: string
}

export const truncateId = (address: string): string => {
  if (!address) return ""
  return `${address.slice(0, 6)}...${address.slice(-6)}`
}
