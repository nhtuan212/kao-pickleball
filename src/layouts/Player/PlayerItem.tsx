import React from "react";
import { twMerge } from "tailwind-merge";
import Card from "@/components/Card";
import { TEXT } from "@/constants";
import { ICheckIn, IPlayer } from "@/types";

type IPlayerItem = Partial<ICheckIn> & Partial<IPlayer>;

export default function PlayerItem({
    player,
    content,
    className,
}: {
    player: IPlayerItem;
    content?: React.ReactNode;
    className?: string;
}) {
    //** Return */
    return (
        <Card
            key={player.id}
            className={twMerge("flex-row justify-between items-center py-2 border", className)}
        >
            <Card.Content className="gap-0">
                <p
                    className={twMerge(
                        "font-semibold",
                        player.gender === "Men" ? "text-primary" : "text-pink-500",
                    )}
                >
                    {player.name}
                </p>
                <p className="text-sm text-slate-700">{`${TEXT.LEVEL} ${player.level}`}</p>
            </Card.Content>

            {content}
        </Card>
    );
}
