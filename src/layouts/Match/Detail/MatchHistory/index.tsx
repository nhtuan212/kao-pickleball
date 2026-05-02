import MatchHistoryItem from "./MatchHistoryItem";
import Card from "@/components/Card";
import { TEXT } from "@/constants";
import { ICheckIn, IGame } from "@/types";

export default function MatchHistory({ players, games }: { players: ICheckIn[]; games: IGame[] }) {
    if (!games) {
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
                <MatchHistoryItem key={game.id} game={game} players={players} />
            ))}
        </div>
    );
}
