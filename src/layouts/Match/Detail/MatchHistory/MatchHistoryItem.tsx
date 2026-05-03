import Card from "@/components/Card";
import Chip from "@/components/Chip";
import { TEXT } from "@/constants";
import { IGame } from "@/types";

export default function MatchHistoryItem({ game }: { game: IGame }) {
    //** Variables */
    const team1 = game.players?.filter(p => p.team === 1) || [];
    const team2 = game.players?.filter(p => p.team === 2) || [];

    const score1 = team1[0]?.score ?? 0;
    const score2 = team2[0]?.score ?? 0;

    //** Render  */
    return (
        <Card className="p-0">
            <Card.Header>
                <div className="bg-primary-200 px-4 py-2 border-b flex justify-between items-center text-xs font-bold text-slate-500">
                    <p>{`${TEXT.COURT} ${game.courtNumber}`}</p>
                    <Chip size="sm" variant="primary" color="success">
                        {TEXT.COMPLETED}
                    </Chip>
                </div>
            </Card.Header>

            <Card.Content className="p-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Team 1 */}
                    <div className="flex-1 text-center">
                        {team1.map(p => (
                            <p key={p.id} className="text-sm font-medium text-slate-700 truncate">
                                {p.name}
                            </p>
                        ))}
                    </div>

                    {/* Score Board */}
                    <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg">
                        <span
                            className={`text-xl font-black ${score1 > score2 ? "text-primary" : "text-slate-500"}`}
                        >
                            {score1}
                        </span>
                        <span className="text-slate-300 font-bold">:</span>
                        <span
                            className={`text-xl font-black ${score2 > score1 ? "text-primary" : "text-slate-500"}`}
                        >
                            {score2}
                        </span>
                    </div>

                    {/* Team 2 */}
                    <div className="flex-1 text-center">
                        {team2.map(p => (
                            <p key={p.id} className="text-sm font-medium text-slate-700 truncate">
                                {p.name}
                            </p>
                        ))}
                    </div>
                </div>
            </Card.Content>
        </Card>
    );
}
