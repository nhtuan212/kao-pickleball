import Button from "@/components/Button";
import PlayerForm from "./PlayerForm";
import { Plus } from "lucide-react";
import { TEXT } from "@/constants";
import { useModalStore } from "@/stores";

export default function TopContent() {
    //** Stores */
    const { setModal } = useModalStore();

    //** Return */
    return (
        <div className="flex justify-between items-center gap-2">
            <h3 className="title">{TEXT.PLAYER}</h3>
            <Button
                size="sm"
                onPress={() =>
                    setModal({
                        isOpen: true,
                        size: "sm",
                        header: `${TEXT.ADD} ${TEXT.PLAYER}`,
                        body: <PlayerForm />,
                    })
                }
            >
                <Plus />
                {TEXT.PLAYER}
            </Button>
        </div>
    );
}
