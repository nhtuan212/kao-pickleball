import Link from "next/link";
import Profile from "./Profile";
import Logo from "@/components/Logo";
import { ROUTE, TEXT } from "@/constants";

export default function Header() {
    return (
        <header className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-10">
            <div className="flex items-center gap-2">
                <Link href={ROUTE.HOME}>
                    <Logo className="w-10" />
                </Link>
                <h1 className="text-xl font-bold tracking-tight text-slate-900">{TEXT.APP_NAME}</h1>
            </div>
            <div>
                <Profile />
            </div>
        </header>
    );
}
