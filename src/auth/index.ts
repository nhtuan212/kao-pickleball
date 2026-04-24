import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import type { DefaultSession, NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import { authCredential } from "./authCredential";
import { cookies } from "next/headers";

declare module "next-auth" {
    interface User {
        username: string;
        role: string;
        isActive: boolean;
    }
    interface Session {
        user: {
            role?: string;
        } & DefaultSession["user"];
    }
}

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
    providers: authCredential,

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.role = user.role;
                token.isActive = user.isActive;

                // Set accessToken to cookie
                const cookieStore = await cookies();
                cookieStore.set("accessToken", (user as any).accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 60 * 60 * 24, // Alive time before cookie was removed
                    path: "/",
                });
            }

            return token;
        },

        async session({ session, token }) {
            session.user = token;
            return session;
        },
    },
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
