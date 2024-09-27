"use client";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {

  WalletModalProvider,

} from "@solana/wallet-adapter-react-ui";
import React from "react";
import "@solana/wallet-adapter-react-ui/styles.css";

import { ThemeProvider } from "@/provider/theme-provider"


const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>

        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default Provider;
