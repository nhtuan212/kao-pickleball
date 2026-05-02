import { IGamePlayer } from "@/types";

export default function GameFighting({
    teamA,
    teamB,
}: {
    teamA: IGamePlayer[];
    teamB: IGamePlayer[];
}) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <div className="flex-1">
                    {teamA[0].name} - {teamA[1].name}
                </div>
                <p className="font-bold text-xl">{teamA[0].score}</p>
            </div>

            <div className="flex items-center gap-2">
                <div className="flex-1">
                    {teamB[0].name} - {teamB[1].name}
                </div>
                <p className="font-bold text-xl">{teamB[0].score}</p>
            </div>
        </div>
    );
}
