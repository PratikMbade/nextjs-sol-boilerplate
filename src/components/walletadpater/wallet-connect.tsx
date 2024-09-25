"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React, { useState } from "react";
type Props = {};

const WalletConnect = (props: Props) => {
  const wallet = useWallet();
  const [balance, setBalance] = useState<number>();
  const { connection } = useConnection();

  const getBalanceOfUser = async () => {
    const data = await connection.getBalance(wallet.publicKey!);

    setBalance(data);
  };

  return (
    <div>
      <WalletMultiButton />
      {/* <p>{wallet.publicKey?.toBase58()}</p>
      <button onClick={getBalanceOfUser}>Fetch Balance</button>

      {balance && <p>Balance: {balance}</p>} */}
    </div>
  );
};

export default WalletConnect;
