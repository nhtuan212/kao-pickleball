"use client";

import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function Logo({ className }: { className?: string }) {
    return (
        <Image
            className={twMerge("w-16", className)}
            src="/logo.svg"
            alt="Logo"
            width={100}
            height={20}
            priority
        />
    );
}
