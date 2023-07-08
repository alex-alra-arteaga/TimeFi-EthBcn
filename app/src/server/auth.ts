// Imports
// ========================================================
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import { prisma } from "~/server/db";
import EmailProvider from "next-auth/providers/email";
// SIWE Integration
import type { CtxOrReq } from "next-auth/client/_utils";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import type { Session } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { SiweMessage } from "siwe";
import GitHubProvider from "next-auth/providers/github";
// Types
// ========================================================
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      type: "email" | "ethereum";
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    type: "email" | "ethereum";
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    type: "email" | "ethereum";
  }
}

// Auth Options
// ========================================================
/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: (ctxReq: CtxOrReq) => NextAuthOptions =  ({
  req,
}) => ({
  callbacks: {
    // token.sub will refer to the id of the wallet address
    session: ({ session, token }) => {
      if (token)
        return {
          ...session,
          user: {
            ...session.user,
            id: token.sub,
            type: token.type,
          },
        } as Session & {
          user: { id: string; sessionTypes: "email" | "ethereum" };
        };
      return session;
    },
    // OTHER CALLBACKS to take advantage of but not needed
    // signIn: async (params: { // Used to control if a user is allowed to sign in
    //   user: User | AdapterUxser
    //   account: Account | null
    //   // Not used for credentials
    //   profile?: Profile
    //   // Not user
    //   email?: {
    //     verificationRequest?: boolean
    //   }
    //   /** If Credentials provider is used, it contains the user credentials */
    //   credentials?: Record<string, CredentialInput>
    // }) => { return true; },
    // redirect: async (params: { // Used for a callback url but not used with credentials
    //   /** URL provided as callback URL by the client */
    //   url: string
    //   /** Default base URL of site (can be used as fallback) */
    //   baseUrl: string
    // }) => {
    //    return params.baseUrl;
    // },
    jwt: (
      // Callback whenever JWT created (i.e. at sign in)
      { token, user }
    ) => {
      if (user) {
        token.type = user.type;
      }
      return token;
    },
  },
  // OTHER OPTIONS (not needed)
  secret: process.env.NEXTAUTH_SECRET, // in case you want pass this along for other functionality
  // adapter: PrismaAdapter(prisma), // Not meant for type 'credentials' (used for db sessions)
  session: {
    strategy: "jwt",
  },
  // session: { // Credentials defaults to this strategy
  //   strategy: 'jwt',
  //   maxAge: 2592000,
  //   updateAge: 86400,
  //   generateSessionToken: () => 'SomeValue'
  // },
  // events: { // Callback events
  //   signIn: async (message: {
  //     user: User
  //     account: Account | null
  //     profile?: Profile
  //     isNewUser?: boolean
  //   }) => {},
  //   signOut: async (message: { session: Session; token: JWT }) => {},
  //   createUser:  async (message: { user: User }) => {},
  //   updateUser:  async (message: { user: User }) => {},
  //   linkAccount: async (message: {
  //     user: User | AdapterUser
  //     account: Account
  //     profile: User | AdapterUser
  //   }) => {},
  //   session: async (message: { session: Session; token: JWT }) => {}
  // },
  adapter: PrismaAdapter(prisma),
  providers:   [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      // ! Don't add this
      // - it will assume more than one auth provider
      // - and redirect to a sign-in page meant for oauth
      // - id: 'siwe',
      name: "Ethereum",
      type: "credentials", // default for Credentials
      // Default values if it was a form
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      authorize: async (credentials) => {
        try {
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message || "{}") as Partial<SiweMessage>
          );
          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL ?? "");

          const fields = await siwe.verify({
            signature: credentials?.signature || "",
            domain: nextAuthUrl.host,
            nonce: await getCsrfToken({ req }),
          });

          // Check if user exists
          let user = await prisma.user.findUnique({
            where: {
              address: fields.data.address,
            },
          });
          // Create new user if doesn't exist
          if (!user) {
            user = await prisma.user.create({
              data: {
                address: fields.data.address,
              },
            });
            // create account
            await prisma.account.create({
              data: {
                userId: user.id,
                type: "credentials",
                provider: "Ethereum",
                providerAccountId: fields.data.address,
              },
            });
          }

          return {
            // Pass user id instead of address
            // id: fields.address
            id: user.id,
            type: "ethereum",
          };
        } catch (error) {
          // Uncomment or add logging if needed
          console.error({ error });
          return null;
        }
      },
    }),
  ],
});

// Auth Session
// ========================================================
/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  // Changed from authOptions to authOption(ctx)
  // This allows use to retrieve the csrf token to verify as the nonce
  return getServerSession(ctx.req, ctx.res, authOptions(ctx));
};

