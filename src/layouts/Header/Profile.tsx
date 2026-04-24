import { signOut } from "next-auth/react";
import Button from "@/components/Button";
import { useProfileStore } from "@/stores";
import { CircleUserRound, LogOut } from "lucide-react";

export default function Profile() {
    //** Stores */
    const { profile } = useProfileStore();

    //** Return */
    if (!profile) return null;

    return (
        <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-slate-900">{profile.username}</p>
            <CircleUserRound />
            <Button variant="ghost" isIconOnly onPress={() => signOut()}>
                <LogOut className="w-4 h-4" />
            </Button>
        </div>
    );
}
