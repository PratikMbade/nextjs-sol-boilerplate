import {z} from 'zod'



// Regular expression to validate a Base58 string (Solana public key)
const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{43,44}$/;

export const SigninSchema = z.object({
  publicAddress: z
    .string()
    .min(43, 'It is not a valid Solana address') // Solana addresses are usually 44 characters
    .max(44, 'It is not a valid Solana address')
    .regex(base58Regex, 'It is not a valid Solana address'),
  signedNonce: z.string().min(64, 'Nonce must be 64 characters long'),
});


interface Cookie {
    name: string;
    value: string;
    options: Record<string, unknown>; // Replaces any with a safer type

}

export interface SignInResponse{
    success:boolean;
    error:string;
}




export interface SignOutResponse {
    redirect?: string; 
    cookies: Cookie[]; 
  }