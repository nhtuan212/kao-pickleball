import MatchHistoryItem from "./MatchHistoryItem";
import Card from "@/components/Card";
import { TEXT } from "@/constants";
import { IGame } from "@/types";
import { isEmpty } from "@/utils";

export default function MatchHistory({ games }: { games: IGame[] }) {
    const completedGames = games.filter(
        game => game.status === "completed" || (game.players && game.players.length > 0),
    );

    if (!completedGames || isEmpty(completedGames)) {
        return (
            <Card className="min-h-40 justify-center items-center bg-slate-100 border-2 border-dashed rounded-xl">
                <div className="first-letter:uppercase lowercase">
                    {`${TEXT.NOT_FOUND} ${TEXT.MATCH} ${TEXT.COMPLETED}`}
                </div>
            </Card>
        );
    }

    return (
        <div className="grid sm:grid-cols-2 gap-4">
            {games.map(game => (
                <MatchHistoryItem key={game.id} game={game} />
            ))}
        </div>
    );
}
