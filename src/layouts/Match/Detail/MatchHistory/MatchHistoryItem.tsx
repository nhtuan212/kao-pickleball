import Card from "@/components/Card";
import Chip from "@/components/Chip";
import { TEXT } from "@/constants";
import { IGame, IGamePlayer } from "@/types";
import GameFighting from "../GameFighting";

export default function MatchHistoryItem({
    players,
    game,
}: {
    players: IGamePlayer[];
    game: IGame;
}) {
    const winners = game?.players?.filter(p => p.result === "win");
    const losers = game?.players?.filter(p => p.result === "lose");

    console.log({ winners, losers });

    //** Return  */
    return (
        <Card className="p-0">
            <Card.Header>
                <div className="bg-slate-50 px-4 py-2 border-b flex justify-between items-center text-xs font-bold text-slate-500">
                    <p>{`${TEXT.COURT} ${game.courtNumber}`}</p>
                    <Chip variant="primary" color="success">
                        {TEXT.COMPLETED}
                    </Chip>
                </div>
            </Card.Header>

            <Card.Content className="p-4">
                <GameFighting teamA={winners} teamB={losers} players={players} />
            </Card.Content>
        </Card>
    );
}
