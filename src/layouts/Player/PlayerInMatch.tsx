import PlayerItem from "./PlayerItem";
import { ICheckIn } from "@/types";

export default function PlayerInMatch({ players }: { players: ICheckIn[] }) {
    //** Return */
    return (
        <div className="flex flex-col gap-4">
            {players.map(player => (
                <PlayerItem key={player.id} player={player} />
            ))}
        </div>
    );
}
