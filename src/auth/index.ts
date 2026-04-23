import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import { authCredential } from "./authCredential";

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
    providers: authCredential,

    // callbacks: {
    //     async signIn({ user, account, profile, email, credentials }) {
    //         return true;
    //     },
    //     async redirect({ url, baseUrl }) {
    //         return baseUrl;
    //     },
    //     async session({ session, token, user }) {
    //         return session;
    //     },
    //     async jwt({ token, user, account, profile, isNewUser }) {
    //         return token;
    //     },
    // },
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
    ...args:
        | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    return getServerSession(...args, config);
}
