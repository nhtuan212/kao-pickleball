"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Button from "@/components/Button";
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

    return (
        <div className="container mx-auto">
            <ToastProvider placement="top end" />
            {children}
            <Button onPress={async () => await signOut()}>Logout</Button>
        </div>
    );
}
