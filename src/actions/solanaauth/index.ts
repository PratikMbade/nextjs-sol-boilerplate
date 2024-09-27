"use server";

import { auth, signIn, signOut } from "@/auth";
import { SignInResponse, SigninSchema, SignOutResponse } from "./type";
import { z } from "zod";



export const signout = async ():Promise<SignOutResponse | null>=>{
    try {
        console.log('lets do sign out')
      const res =  await signOut({redirect:false})
      return res;
      
    } catch (error) {
        console.log("something went wrong in signOut",error)
        return null
    }
}

export const getSessionStatus = async (): Promise<boolean> => {
  const session = await auth();

  if (session?.user) {
    return true;
  }

  return false;
};

export const signin = async (
  values: z.infer<typeof SigninSchema>
): Promise<SignInResponse> => {
  const validatedFields = SigninSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, error: "Invalid Fields" };
  }

  const { publicAddress, signedNonce } = validatedFields.data;

  try {
    const res = await signIn("crypto", {
      publicAddress,
      signedNonce,
      redirect: false,
    });

    if (res) {
      return { success: true, error: "false" };
    }
  } catch (error: unknown) { 
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred" }; 
  }

  return { success: true, error: "something went wrong" };
};
