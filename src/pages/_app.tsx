import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RecoilRoot } from "recoil"
import { useState } from "react"
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react"
import { PetraWallet } from "petra-plugin-wallet-adapter"
import "@/styles/globals.css"
import "@fortawesome/fontawesome-svg-core/styles.css"
import "@/styles/walletStyle.css"
import { useRouter } from "next/router"
import Container from "@/components/Common/Container"
import { MetaMaskProvider } from "metamask-react"

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())
  const { pathname } = useRouter()

  const wallets = [new PetraWallet()]

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <MetaMaskProvider>
          <AptosWalletAdapterProvider plugins={wallets} autoConnect={false}>
            {pathname.slice(1, 4) === "app" ? (
              <Container>
                <Component {...pageProps} />
              </Container>
            ) : (
              <Component {...pageProps} />
            )}
          </AptosWalletAdapterProvider>
        </MetaMaskProvider>
      </RecoilRoot>
    </QueryClientProvider>
  )
}

export default MyApp
