import { usePathname, useRouter } from "next/navigation";
import Button from "@/components/Button";
import { MENU } from "@/constants/menu";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    //** Render */
    return (
        <ul className="flex flex-col gap-y-2">
            {MENU.map(item => (
                <Button
                    key={item.url}
                    size="lg"
                    className="w-full"
                    variant={item.url === pathname ? "primary" : "ghost"}
                    onPress={() => {
                        router.push(item.url);
                    }}
                >
                    <li className="w-full flex items-center gap-3 rounded-lg text-sm">
                        {item.icon}
                        {item.label}
                    </li>
                </Button>
            ))}
        </ul>
    );
}
