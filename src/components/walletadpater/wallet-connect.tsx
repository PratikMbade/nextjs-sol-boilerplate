"use client";
import React, { useEffect, useState } from "react";

import { getSessionStatus, signin, signout } from "@/actions/solanaauth";
import {  WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";




interface ValueTypes {
  publicAddress: string;
  signedNonce: string;
}




function uint8ArrayToBase64(uint8Array: Uint8Array): string {
  const decoder = new TextDecoder();
  const binaryString = decoder.decode(uint8Array);
  
  return btoa(binaryString);
}

const WalletConnect = () => {

  const activeAccount = useWallet()




 
  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [user, setUser] = useState<boolean>(false);

  async function onSignInWithCrypto() {
    try {
      const publicAddress = activeAccount?.publicKey?.toBase58();
      console.log("Public address:", publicAddress);

      if (!publicAddress) {
        throw new Error(
          "Active account is not available or does not have an address."
        );
      }


    

       await new Promise((resolve) => setTimeout(resolve, 100));

      
        const response = await fetch("/api/auth/cryptononce", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ publicAddress }),
        });

        const responseData = await response.json();
        console.log("res data is ", responseData);

        const signedNonceArray = await activeAccount.signMessage!(
          new TextEncoder().encode(responseData.nonce)
        );
    
        // Convert Uint8Array to Base64 string
        const signedNonce = uint8ArrayToBase64(signedNonceArray);
        console.log("Signed nonce:", signedNonce);
    
        // Prepare the values for signing in
        const values: ValueTypes = {
          publicAddress,
          signedNonce, // Now a Base64 string
        };

        await signin(values);



    } catch (error) {
      console.log("Error:", error);
    }
  }

  const signedTransactionCall = async () => {
    console.log("called")
    if (activeAccount?.publicKey) {
      console.log("user is ",user)
      if (!user) {
        await onSignInWithCrypto();
      }
    }
  };

  const handleDisconnect = async () => {
    if (activeAccount.publicKey) {
      await activeAccount.disconnect(); // Disconnect the wallet
      const isSignout = await signout(); // Handle signout from your auth system
      console.log("isSignout", isSignout);
      setUser(false); // Update user state
      console.log("Wallet disconnected");
    }
  };



  useEffect(() => {

    const checkSessionStatus = async () => {
      try {
        const status = await getSessionStatus();
        console.log("status is ",status)
        setUser(status);
      } catch (error) {
        console.error('Failed to get session status:', error);
        setUser(false);
      } finally {
        setIsSessionLoading(false);
      }
    };


    checkSessionStatus();
  }, []); 

  useEffect(() => {

    const sessionTimeout = setTimeout(() => {
      setIsSessionLoading(false); 
    }, 1000); 

    return () => clearTimeout(sessionTimeout); 
  }, []);

  useEffect(() => {
    if (activeAccount?.publicKey && !isSessionLoading) {


      const timer = setTimeout(() => {
        if (!user ) {
      
          onSignInWithCrypto();
        }
      }, 1000); 

      return () => clearTimeout(timer);
    }
  }, [activeAccount?.publicKey, isSessionLoading]);

  return (
    <div>
     
        
        <WalletMultiButton  style={{zIndex:100}} onClick={signedTransactionCall}/>


      {user && (
        <button onClick={handleDisconnect}>Disconnect Wallet</button>
      )}
      
    </div>
  );
};

export default WalletConnect;
