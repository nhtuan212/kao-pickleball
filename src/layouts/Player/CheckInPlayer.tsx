import { useMemo, useState } from "react";
import PlayerItem from "./PlayerItem";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { InputGroup } from "@/components/Input";
import { Minus, Plus, Search } from "lucide-react";
import { useCheckIn, usePlayer } from "@/hooks/queries";
import { normalize } from "@/utils";
import { TEXT } from "@/constants";
import { IMatch, IPlayer } from "@/types";

export default function CheckInPlayer({ matchId }: { matchId: IMatch["id"] }) {
    //** Queries */
    const { players } = usePlayer();
    const { checkInPlayers, createCheckIn, deleteCheckIn } = useCheckIn(matchId);

    //** States */
    const [search, setSearch] = useState("");

    //** Variables */
    const checkInList = useMemo(() => {
        if (!checkInPlayers) return new Map();

        return new Map(checkInPlayers.map(c => [c.playerId, c.id]));
    }, [checkInPlayers]);

    const sortedPlayers = useMemo(() => {
        if (!players) return [];

        return [...players]
            .filter(p => normalize(p.name).includes(search.toLowerCase()))
            .sort((a, b) => {
                const aChecked = checkInList.has(a.id) ? 1 : 0;
                const bChecked = checkInList.has(b.id) ? 1 : 0;
                return bChecked - aChecked;
            });
    }, [players, checkInList, search]);

    //** Functions */
    const isCheckedIn = (playerId: IPlayer["id"]) => checkInList.has(playerId);

    const handleAddMatchPlayer = (playerId: IPlayer["id"]) => {
        const checkInId = checkInList.get(playerId);

        if (checkInId) {
            return deleteCheckIn(checkInId);
        }

        createCheckIn({
            matchId,
            playerId,
            checkIn: true,
        });
    };

    //** Render */
    return (
        <div className="px-2 py-4 space-y-6">
            <div>
                <InputGroup className="w-full">
                    <InputGroup.Input
                        className="py-0"
                        onChange={e => setSearch(e.target.value)}
                        placeholder={`${TEXT.SEARCH} ${TEXT.PLAYER}`}
                    />
                    <InputGroup.Suffix>
                        <Search className="w-4 h-4" />
                    </InputGroup.Suffix>
                </InputGroup>
            </div>

            <div className="h-100 overflow-auto">
                <div className="flex flex-col gap-3">
                    {sortedPlayers.map(player => (
                        <PlayerItem
                            key={player.id}
                            player={player}
                            className={
                                isCheckedIn(player.id) ? "bg-primary-100 border-primary" : ""
                            }
                            content={
                                <Card.Content className="flex-initial">
                                    <Button
                                        size="sm"
                                        variant={isCheckedIn(player.id) ? "primary" : "outline"}
                                        onPress={() => handleAddMatchPlayer(player.id)}
                                    >
                                        {isCheckedIn(player.id) ? (
                                            <>
                                                <Minus />
                                                {TEXT.DELETE}
                                            </>
                                        ) : (
                                            <>
                                                <Plus />
                                                {TEXT.ADD}
                                            </>
                                        )}
                                    </Button>
                                </Card.Content>
                            }
                        />
                    ))}
                </div>
            </div>

            <div className="flex gap-1">
                {TEXT.CHECK_IN}:
                <span className="font-semibold text-primary">{checkInList.size}</span>
                {TEXT.PLAYER}
            </div>
        </div>
    );
}
