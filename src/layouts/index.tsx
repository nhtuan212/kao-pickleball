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
        <main>
            {/* The component contain common store */}
            <Globals />

            <Header />

            <div className="flex gap-2">
                <nav className="hidden lg:block w-64 min-h-screen bg-slate-50 p-4 border-r">
                    <Navbar />
                </nav>
                <div className="flex-1 p-4 sm:p-6">{children}</div>
            </div>
        </main>
    );
}
