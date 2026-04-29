"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import ReactQueryProvider from "./ReactQueryProvider";
import { I18nProvider } from "@heroui/react";

export default function Provider({
    children,
    session,
}: {
    children: React.ReactNode;
    session: Session;
}) {
    return (
        <I18nProvider locale="vi-VN">
            <SessionProvider session={session} refetchInterval={5 * 60}>
                <ReactQueryProvider>{children}</ReactQueryProvider>
            </SessionProvider>
        </I18nProvider>
    );
}
