import NextAuth, { DefaultSession, JWT as NextAuthJWT } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      wallet_address?: string;

    };
  }

  interface JWT extends NextAuthJWT {
    wallet_address?: string;

  }
}
