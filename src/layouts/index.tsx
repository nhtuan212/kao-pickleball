"use client";

import { useEffect } from "react";
import { Session } from "next-auth";
import Header from "./Header";
import Navbar from "./Navbar";
import Globals from "./Globals";
import { useProfileStore } from "@/stores";

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
            {/* The component contain common store */}
            <Globals />

            <Header />

            <div className="flex gap-2">
                <nav className="hidden sm:block flex-1 max-w-64 p-4 border-r">
                    <Navbar />
                </nav>
                <div className="flex-auto">{children}</div>
            </div>
        </div>
    );
}
