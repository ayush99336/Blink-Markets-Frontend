import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { DAppKitProvider } from "@mysten/dapp-kit-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { registerEnokiWallets } from "@mysten/enoki";
import { SuiGrpcClient } from "@mysten/sui/grpc";
import App from "./App.tsx";
import { dAppKit } from "./dApp-kit.ts";

const queryClient = new QueryClient();
const enokiApiKey = import.meta.env.VITE_ENOKI_PUBLIC_API_KEY;
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const redirectUrl = import.meta.env.VITE_ZKLOGIN_REDIRECT_URI || window.location.origin;
const network = (import.meta.env.VITE_SUI_NETWORK || "testnet") as "testnet" | "devnet" | "mainnet";
const grpcUrls = {
  mainnet: "https://fullnode.mainnet.sui.io:443",
  testnet: "https://fullnode.testnet.sui.io:443",
  devnet: "https://fullnode.devnet.sui.io:443",
};

if (enokiApiKey && googleClientId) {
  registerEnokiWallets({
    apiKey: enokiApiKey,
    network,
    client: new SuiGrpcClient({ network, baseUrl: grpcUrls[network] }),
    windowFeatures: () => {
      const width = 500;
      const height = 800;
      const left = Math.max(0, Math.floor((window.screen.width - width) / 2));
      const top = Math.max(0, Math.floor((window.screen.height - height) / 4));
      // Use comma-separated features for broad browser compatibility.
      return `popup=yes,toolbar=no,status=no,resizable=yes,width=${width},height=${height},top=${top},left=${left}`;
    },
    providers: {
      google: {
        clientId: googleClientId,
        redirectUrl,
        extraParams: {
          prompt: "select_account",
        },
      },
    },
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DAppKitProvider dAppKit={dAppKit}>
        <App />
      </DAppKitProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
