import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";





import { BinaryLike, createHash } from 'crypto';

import { PublicKey } from "@solana/web3.js";
import * as ed25519 from '@noble/ed25519';

// Set the hash function



import { db } from "./db";
// Define a SHA-512 function using Node's crypto module
const sha512 = (data: BinaryLike) => {
  return createHash('sha512').update(data).digest();
};

// Set the hash function for ed25519
ed25519.etc.sha512Sync = sha512;


// Function to verify a signed message
async function verifyMessage(nonce: string, signedNonce: string, publicKey: string): Promise<boolean> {
  // Convert nonce to a buffer
  const messageBuffer = new TextEncoder().encode(nonce);
  // Decode the signature from base64
  const signatureBuffer = Uint8Array.from(atob(signedNonce), c => c.charCodeAt(0));

  // Convert the public key to a Uint8Array
  const publicKeyBuffer = new PublicKey(publicKey).toBytes();

  // Use the verify function from @noble/ed25519 to verify the signature
  const isVerified = await ed25519.verify(signatureBuffer, messageBuffer, publicKeyBuffer);

  return isVerified;
}



async function authorizeWeb3Wallet(
    credentials: Partial<Record<"publicAddress" | "signedNonce", string | string>>, 

) {
    console.log("credentials", credentials);
  
    if (!credentials) return null;
  
  
    const { publicAddress, signedNonce } = credentials;
  
    const user = await db.user.findUnique({
      where: {
        wallet_address:publicAddress,
      },
      include: {
        cryptoLoginNonce: true,
      },
    });
  
    if (!user?.cryptoLoginNonce) return null;
  
    const isVerified = verifyMessage(user.cryptoLoginNonce.nonce, signedNonce!,publicAddress!);
  

  
    if  (!isVerified) return null;
  
    if (user.cryptoLoginNonce.expires < new Date()) return null;
  

    return {
      id: user.id,
      wallet_address: user.wallet_address,
    };
  }
  

export default {
  providers: [
    Credentials({
        id: "crypto",
        name: "Crypto Wallet Auth",
        credentials: {
          publicAddress: { label: "Public Address", type: "text" },
          signedNonce: { label: "Signed Nonce", type: "text" },
        },
        // @ts-expect-error: authorizeWeb3Wallet doesn't match the expected type but is required for custom wallet auth
        authorize:authorizeWeb3Wallet
    }),
  ],
} satisfies NextAuthConfig
