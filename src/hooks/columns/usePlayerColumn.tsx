import { twMerge } from "tailwind-merge";
import Chip from "@/components/Chip";
import Button from "@/components/Button";
import PlayerForm from "@/layouts/Player/PlayerForm";
import ConfirmModal from "@/components/ConfirmModal";
import { toast } from "@/components/Toast";
import { Trash, UserPen } from "lucide-react";
import { useModalStore } from "@/stores";
import { usePlayer } from "../queries";
import { TEXT } from "@/constants";
import { IPlayer } from "@/types";

export function usePlayerColumn() {
    //** Stores */
    const { setModal, closeModal } = useModalStore();

    //** Queries */
    const { deletePlayer } = usePlayer();

    //** Render */
    const columns = [
        {
            key: TEXT.NAME,
            name: TEXT.NAME,
            className: "min-w-20",
            content: (params: { row: IPlayer }) => params.row.name,
        },
        {
            key: TEXT.PHONE,
            name: TEXT.PHONE,
            className: "min-w-32",
            content: (params: { row: IPlayer }) => params.row.phone,
        },
        {
            key: TEXT.GENDER,
            name: TEXT.GENDER,
            className: "min-w-20",
            content: (params: { row: IPlayer }) => (
                <Chip
                    className={twMerge(
                        "bg-primary-300",
                        params.row.gender === "Women" && "bg-pink-300",
                    )}
                >
                    {params.row.gender}
                </Chip>
            ),
        },
        {
            key: TEXT.LEVEL,
            name: TEXT.LEVEL,
            className: "min-w-20",
            content: (params: { row: IPlayer }) => (
                <Chip className="bg-primary-100 font-bold">{params.row.level}</Chip>
            ),
        },
        {
            key: "Action",
            name: "",
            className: "min-w-fit flex justify-end gap-2",
            content: (params: { row: IPlayer }) => (
                <>
                    <Button
                        className="text-primary"
                        variant="outline"
                        isIconOnly
                        onPress={() =>
                            setModal({
                                isOpen: true,
                                header: `${TEXT.UPDATE} ${TEXT.PLAYER}`,
                                body: <PlayerForm player={params.row} />,
                            })
                        }
                    >
                        <UserPen />
                    </Button>
                    <Button
                        className="text-danger"
                        variant="outline"
                        isIconOnly
                        onPress={() =>
                            setModal({
                                isOpen: true,
                                header: `${TEXT.CONFIRM_DELETE} ${TEXT.PLAYER}`,
                                body: (
                                    <ConfirmModal
                                        onConfirm={() =>
                                            deletePlayer(params.row.id).then(() => {
                                                toast({
                                                    title: (
                                                        <div className="first-letter:uppercase lowercase">
                                                            {`${TEXT.DELETE} ${TEXT.PLAYER} ${TEXT.SUCCESSFULLY} !`}
                                                        </div>
                                                    ),
                                                });
                                                closeModal();
                                            })
                                        }
                                    />
                                ),
                            })
                        }
                    >
                        <Trash />
                    </Button>
                </>
            ),
        },
    ];

    return columns;
}
