import { http, createConfig } from 'wagmi'
import { mainnet, arbitrum, optimism, base, polygon, bsc } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

// Get projectId from WalletConnect Cloud (https://cloud.walletconnect.com)
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID'

export const config = createConfig({
    chains: [mainnet, arbitrum, optimism, base, polygon, bsc],
    connectors: [
        injected(),
        metaMask(),
        safe(),
        walletConnect({ projectId }),
    ],
    transports: {
        [mainnet.id]: http(),
        [arbitrum.id]: http(),
        [optimism.id]: http(),
        [base.id]: http(),
        [polygon.id]: http(),
        [bsc.id]: http(),
    },
})
