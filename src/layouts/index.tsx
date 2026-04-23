"use client";

import { ToastProvider } from "@/components/Toast";

export default function MainLayout() {
    return (
        <div className="container mx-auto">
            <ToastProvider placement="top end" />
            Main layout
        </div>
    );
}
