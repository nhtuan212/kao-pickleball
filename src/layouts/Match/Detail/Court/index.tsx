import { useMemo } from "react";
import CourtItem from "./CourtItem";
import { useGame } from "@/hooks/queries";
import { ICheckIn, IGame, IMatch, IPlayer } from "@/types";

export default function Court({
    matchId,
    players,
    courtCount,
}: {
    matchId: IMatch["id"];
    players: (ICheckIn & IPlayer)[];
    courtCount: number;
}) {
    //** Queries */
    const { games } = useGame(matchId);

    //** Variables */
    const arrayCourt = Array.from({ length: courtCount }, (_, i) => ({ id: i + 1 }));

    //** Variables */
    const gamesByCourt = useMemo(() => {
        if (!games) return new Map<number, IGame>();

        return games.reduce((acc, game) => {
            // Check game status
            if (game.status !== "completed" && game.courtNumber <= courtCount) {
                const existingGame = acc.get(game.courtNumber);

                if (
                    !existingGame ||
                    (game.players &&
                        game.players.length > 0 &&
                        (!existingGame.players || existingGame.players.length === 0))
                ) {
                    acc.set(game.courtNumber, game);
                }
            }
            return acc;
        }, new Map<number, IGame>());
    }, [games, courtCount]);

    //** Return */
    return (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            {arrayCourt.map(court => (
                <CourtItem
                    key={court.id}
                    matchId={matchId}
                    players={players}
                    game={gamesByCourt.get(court.id)}
                    court={court.id}
                />
            ))}
        </div>
    );
}
