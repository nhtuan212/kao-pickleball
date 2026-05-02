import { useMemo } from "react";
import Button from "@/components/Button";
import { Autocomplete } from "@/components/Autocomplete";
import { Input } from "@/components/Input";
import { Key } from "@heroui/react";
import { TEXT } from "@/constants";
import { useAppForm } from "@/hooks";
import { useCompletedGame, useCreateGamePlayer, useDeleteGamePlayer } from "@/hooks/queries";
import { Controller } from "react-hook-form";
import { gamePlayerSchema, IGamePlayerForm } from "@/utils";
import { ICheckIn, IGame } from "@/types";

export default function CourtForm({ game, players }: { game: IGame; players: ICheckIn[] }) {
    //** Queries */
    const { createGamePlayer } = useCreateGamePlayer();
    const { deleteGamePlayer } = useDeleteGamePlayer();
    const { completedGame } = useCompletedGame();

    //** Functions */
    const transformGameData = (game: IGame) => {
        const team1Ids = game?.players?.filter(p => p.team === 1).map(p => p.id) || [];
        const team2Ids = game?.players?.filter(p => p.team === 2).map(p => p.id) || [];

        return {
            team1: {
                players: [team1Ids[0] || "", team1Ids[1] || ""],
                score: 0,
            },
            team2: {
                players: [team2Ids[0] || "", team2Ids[1] || ""],
                score: 0,
            },
        };
    };

    const handleChangePlayer = (teamIndex: number, playerId: Key | null, oldId: Key | null) => {
        if (!playerId) return null;

        //** Delete player ID when change others */
        if (oldId && oldId !== playerId && typeof oldId === "string") {
            deleteGamePlayer(oldId);
        }

        if (typeof playerId === "string") {
            createGamePlayer({ gameId: game.id, playerId, team: teamIndex + 1 });
        }
    };

    const handleDeletePlayer = (playerId: Key | null) => {
        if (!playerId) return null;

        if (typeof playerId === "string") {
            deleteGamePlayer(playerId);
        }
    };

    //** Use App Form */
    const defaultValues = useMemo(() => {
        const rawData = transformGameData(game);
        return gamePlayerSchema.parse(rawData);
    }, [game]);

    const { register, control, handleSubmit, watch } = useAppForm<IGamePlayerForm>({
        schema: gamePlayerSchema,
        defaultValues,
    });

    const formValues = watch();

    const handleSubmitGame = (data: IGamePlayerForm) => {
        completedGame({
            id: game.id,
            body: data,
        });
    };

    //** Variables */
    const selectedKeys = useMemo(() => {
        return [
            [formValues.team1.players[0] || null, formValues.team1.players[1] || null],
            [formValues.team2.players[0] || null, formValues.team2.players[1] || null],
        ];
    }, [formValues]);

    const allSelectedPlayerIds = useMemo(() => {
        return [...formValues.team1.players, ...formValues.team2.players].filter(
            id => id && id !== "",
        );
    }, [formValues]);

    //** Render */
    const renderPlayers = (teamIndex: number, teamName: "team1" | "team2") =>
        [0, 1].map(i => {
            // Filter player without dup
            const currentFieldId = selectedKeys[teamIndex][i];

            const availablePlayers = players.filter(
                p => !allSelectedPlayerIds.includes(p.playerId) || p.playerId === currentFieldId,
            );

            return (
                <Controller
                    key={i}
                    control={control}
                    name={`${teamName}.players.${i}`}
                    render={({ field, fieldState }) => (
                        <Autocomplete
                            placeholder={TEXT.PLAYER}
                            value={selectedKeys[teamIndex][i]}
                            onChange={key => {
                                handleChangePlayer(teamIndex, key, field.value);
                                field.onChange(key);
                            }}
                            onClearValue={key => {
                                console.log("cleared!", key);
                                handleDeletePlayer(key);
                                field.onChange(null);
                            }}
                            errorMessage={fieldState.error}
                        >
                            {availablePlayers.map(p => (
                                <Autocomplete.Item
                                    key={p.playerId}
                                    id={p.playerId}
                                    textValue={p.name}
                                >
                                    {p.name}
                                </Autocomplete.Item>
                            ))}
                        </Autocomplete>
                    )}
                />
            );
        });

    return (
        <form className="space-y-4" onSubmit={handleSubmit(handleSubmitGame)}>
            <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="w-full sm:flex-1 space-y-3">
                    {renderPlayers(0, "team1")}
                    <Input type="number" placeholder="Score" {...register("team1.score")} />
                </div>

                <div className="flex justify-center items-center text-slate-300 font-bold">VS</div>

                <div className="w-full sm:flex-1 space-y-3">
                    {renderPlayers(1, "team2")}
                    <Input type="number" placeholder="Score" {...register("team2.score")} />
                </div>
            </div>

            <Button type="submit" className="w-full">
                {TEXT.COMPLETED}
            </Button>
        </form>
    );
}
