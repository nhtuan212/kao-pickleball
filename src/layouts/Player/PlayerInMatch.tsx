import PlayerItem from "./PlayerItem";
import { useCheckIn } from "@/hooks/queries";
import { IMatch } from "@/types";

export default function PlayerInMatch({ matchId }: { matchId: IMatch["id"] }) {
    //** Queries */
    const { checkInPlayers } = useCheckIn(matchId);

    console.log({ checkInPlayers });

    //** Return */
    return (
        <div className="flex flex-col gap-4">
            {checkInPlayers.map(player => (
                <PlayerItem key={player.id} player={player} />
            ))}
        </div>
    );
}
