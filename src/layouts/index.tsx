"use client";

import { Session } from "next-auth";
import Header from "./Header";
import { ToastProvider } from "@/components/Toast";
import { useProfileStore } from "@/stores";
import { useEffect } from "react";

export default function MainLayout({
    children,
    session,
}: {
    children: React.ReactNode;
    session: Session;
}) {
    //** Stores */
    const { setProfile } = useProfileStore();

    //** Effects */
    useEffect(() => {
        session && setProfile(session);
    }, [session, setProfile]);

    //** Return */
    return (
        <div className="container mx-auto">
            <ToastProvider placement="top end" />
            <Header />
            {children}
        </div>
    );
}
