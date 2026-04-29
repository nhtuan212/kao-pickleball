import { useState } from "react";
import CourtItem from "./CourtItem";
import { Input } from "@/components/Input";
import { IPlayer } from "@/types";

export default function Court({ players, courtCount }: { players: IPlayer[]; courtCount: number }) {
    //** States */
    const [courts, setCourts] = useState(
        Array.from({ length: courtCount }, (_, i) => ({ id: i + 1 })),
    );

    //** Functions */
    const handleCourtCountChange = (count: number) => {
        setCourts(prev => {
            if (count > prev.length) {
                return [
                    ...prev,
                    ...Array.from({ length: count - prev.length }, (_, i) => ({
                        id: prev.length + i + 1,
                    })),
                ];
            }
            return prev.slice(0, count);
        });
    };

    //** Return */
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <span className="font-semibold">Số lượng sân:</span>
                <Input
                    className="max-w-16"
                    type="number"
                    min={1}
                    defaultValue={courtCount}
                    onChange={e => handleCourtCountChange(Number(e.target.value))}
                />
            </div>

            <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                {courts.map(court => (
                    <CourtItem key={court.id} players={players} court={court.id} />
                ))}
            </div>
        </div>
    );
}
