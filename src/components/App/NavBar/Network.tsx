import { TYPO } from "@/assets/fonts"
import { networkState, NETWORKS, Network } from "@/recoils/networkState"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { ComponentProps, useCallback, useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { mq } from "../Common/paddings"
import { useRef } from "react"
import { useOutsideClick } from "@/hooks/useOutsideClick"
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { metaState } from "@/recoils/metamask"

/**
 * Network selector
 */
const Network = ({ ...props }: ComponentProps<"div">) => {
  const [curNet, setCurNet] = useRecoilState(networkState)
  const [meta, setMeta] = useRecoilState(metaState)
  const [isOpen, setIsOpen] = useState(false)
  const [wide, setWide] = useState(false)
  const { connected } = useWallet()
  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick(ref, () => setIsOpen(false))

  const Icon = useCallback(
    (net: Network) => {
      const width = net.name === "Ethereum" || net.name === "Sepolia" ? 13 : 18
      const padding = net.name === "Ethereum" || net.name === "Sepolia" ? 2 : 0
      return (
        <>
          <Image
            src={net.img}
            alt={net.name}
            width={width}
            style={{
              width: `${width}px`,
              height: "auto",
              marginLeft: `${padding}px`,
            }}
          />
          <ButtonContent>{net.name}</ButtonContent>
        </>
      )
    },
    [curNet]
  )

  useEffect(() => {
    curNet.name === "Ethereum" || curNet.name === "Sepolia"
      ? setWide(true)
      : setWide(false)
  }, [curNet])

  return (
    <Container
      ref={ref}
      onClick={() => setIsOpen((prev) => !prev)}
      wide={wide}
      connected={connected || meta.connected}
    >
      <Button>
        {Icon(curNet)}
        <FontAwesomeIcon
          icon={faChevronDown}
          css={css`
            color: white;
            transition: all 0.25s;
            position: absolute;
            right: 16px;
            transform: ${isOpen ? "rotate(-180deg)" : "rotate(0deg)"};
          `}
        />
      </Button>
      {isOpen ? (
        NETWORKS.map((network, idx) =>
          network.name !== curNet.name ? (
            <Button
              key={`${network.name}-${idx}`}
              onClick={() => {
                network.name === "Near"
                  ? alert("This network is preparing for support.")
                  : setCurNet(network)
              }}
            >
              {Icon(network)}
            </Button>
          ) : (
            <></>
          )
        )
      ) : (
        <></>
      )}
    </Container>
  )
}

const Container = styled.div<{ connected: boolean; wide: boolean }>`
  width: ${(props) => (props.wide ? "170px" : "150px")};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  top: 31px;
  background-color: black;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 1;

  @media (min-width: 700px) {
    right: ${(props) => (props.connected ? "180px" : "210px")};
    position: absolute;
  }

  ${mq[1]} {
    right: ${(props) => (props.connected ? "220px" : "250px")};
  }

  @media (min-width: 1660px) {
    right: ${(props) => (props.connected ? "500px" : "530px")};
  }

  ${mq[3]} {
    right: ${(props) => (props.connected ? "790px" : "820px")};
  }
`

const Button = styled.button`
  width: 100%;
  height: 42px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  border: none;
  background: none;
  padding: 0px 15px;
  cursor: pointer;
`

const ButtonContent = styled.span`
  ${TYPO.text3_mon.Bd};
  color: white;
`

export default Network
