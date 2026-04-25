import { twMerge } from "tailwind-merge";
import Chip from "@/components/Chip";
import { TEXT } from "@/constants";
import { IPlayer } from "@/types";
import Button from "@/components/Button";
import { Trash, UserPen } from "lucide-react";

export function usePlayerColumn() {
    const columns = [
        {
            key: TEXT.NAME,
            name: TEXT.NAME,
            className: "min-w-24",
            content: (params: { row: IPlayer }) => params.row.name,
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
            className: "min-w-28",
            content: (params: { row: IPlayer }) => (
                <Chip className="bg-primary-100 font-bold">{params.row.level}</Chip>
            ),
        },
        {
            key: "Action",
            name: "",
            className: "min-w-fit flex justify-end gap-2",
            content: () => (
                <>
                    <Button className="text-primary" variant="outline" isIconOnly>
                        <UserPen />
                    </Button>
                    <Button className="text-danger" variant="outline" isIconOnly>
                        <Trash />
                    </Button>
                </>
            ),
        },
    ];

    return columns;
}
