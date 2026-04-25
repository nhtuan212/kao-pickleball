import Link from "next/link";
import Profile from "./Profile";
import Navbar from "../Navbar";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import { Menu, X } from "lucide-react";
import { useDrawerStore } from "@/stores";
import { ROUTE, TEXT } from "@/constants";

export default function Header() {
    //** Stores */
    const { drawer, setDrawer } = useDrawerStore();

    //** Render */
    const renderLogo = () => {
        return (
            <div className="flex items-center gap-2">
                <Link href={ROUTE.HOME}>
                    <Logo className="w-10" />
                </Link>

                <h1 className="text-xl font-bold tracking-tight text-slate-900">{TEXT.APP_NAME}</h1>
            </div>
        );
    };
    return (
        <header className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-10">
            <div className="flex items-center gap-2">
                <Button
                    isIconOnly
                    className="sm:hidden"
                    variant="ghost"
                    onPress={() =>
                        setDrawer({
                            isOpen: true,
                            isClose: true,
                            header: <div className="py-4 border-b">{renderLogo()}</div>,
                            body: <Navbar />,
                        })
                    }
                >
                    {drawer.isOpen ? <X /> : <Menu />}
                </Button>

                {renderLogo()}
            </div>
            <div>
                <Profile />
            </div>
        </header>
    );
}
