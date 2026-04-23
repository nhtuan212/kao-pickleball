"use client";

import { SessionProvider } from "next-auth/react";
import ReactQueryProvider from "./ReactQueryProvider";

export default function Provider({
    children,
    session,
}: {
    children: React.ReactNode;
    session: any;
}) {
    return (
        <SessionProvider session={session} refetchInterval={5 * 60}>
            <ReactQueryProvider>{children}</ReactQueryProvider>
        </SessionProvider>
    );
}
