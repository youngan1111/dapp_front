import styled from "@emotion/styled"
import { Empty, TokenSelector } from "./Burning"
import { useEffect, useState } from "react"
import { NFTProps } from "./Burning/nft"
import { useMetamask } from "@/hooks/useMetamask"
import { Network, Alchemy } from "alchemy-sdk"
import Ethereum from "@/assets/icons/token/ethereum.svg"

const STAGES = [Empty, TokenSelector] as const

/**
 * 거래 박스에서 Burn 클릭했을 때
 */
const Burn = () => {
  const [burn, setBurn] = useState({ isActive: false, title: "Empty" })
  const [stage, setStage] = useState(0)
  const [nfts, setNfts] = useState<Array<NFTProps>>([])
  const [choices, setChoices] = useState<Array<string>>([])
  const { metaAccount } = useMetamask()

  const CurStage = STAGES[stage]

  const getUserNFTs = async () => {
    if (metaAccount) {
      const settings = {
        apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
        network: Network.ETH_SEPOLIA, // Replace with your network.
      }
      const alchemy = new Alchemy(settings)
      alchemy.nft.getNftsForOwner(metaAccount!).then(({ ownedNfts }) => {
        console.log(ownedNfts)
        ownedNfts.map((each) => {
          if (
            each.contract.address ===
            String(
              process.env.NEXT_PUBLIC_NFT_MINTING_CONTRACT_ADDRESS
            ).toLowerCase()
          ) {
            setNfts((prev) => [
              ...prev,
              {
                tName: each.description,
                principal: each.title,
                tID: each.tokenId,
                creationDtae: each.timeLastUpdated,
                foundation: each!.rawMetadata!.attributes![0].currency,
                fLogo: Ethereum,
                deposit: each!.rawMetadata!.attributes![0].net_deposit,
              },
            ])
          }
        })
      })

      setStage(1)
    }
  }

  useEffect(() => {
    if (choices.length > 0)
      setBurn({
        isActive: true,
        title: "Burn",
      })
    else
      setBurn({
        isActive: false,
        title: "Select NFT",
      })
  }, [choices])

  useEffect(() => {
    getUserNFTs()
  }, [metaAccount])

  return (
    <Container>
      <CurStage tokens={nfts} choices={choices} setChoices={setChoices} />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  min-height: 300px;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`

export default Burn
