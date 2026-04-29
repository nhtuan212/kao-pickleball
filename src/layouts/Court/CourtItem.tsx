import Card from "@/components/Card";
import { Autocomplete } from "@/components/Autocomplete";
import { TEXT } from "@/constants";
import { IPlayer } from "@/types";

export default function CourtItem({ players, court }: { players: IPlayer[]; court: number }) {
    return (
        <Card className="p-0 border rounded-lg">
            <Card.Header className="bg-primary-200 p-4 rounded-tr-lg">
                <h3>{`${TEXT.COURT} ${court}`}</h3>
            </Card.Header>

            <Card.Content className="p-4">
                <div className="grid col-span-1 md:grid-cols-7 gap-2">
                    <div className="grid md:col-span-3 gap-2">
                        <Autocomplete placeholder={TEXT.PLAYER}>
                            {players.map(player => (
                                <Autocomplete.Item
                                    key={player.id}
                                    id={player.id}
                                    textValue={player.name}
                                >
                                    {player.name}
                                </Autocomplete.Item>
                            ))}
                        </Autocomplete>

                        <Autocomplete placeholder={TEXT.PLAYER}>
                            {players.map(player => (
                                <Autocomplete.Item
                                    key={player.id}
                                    id={player.id}
                                    textValue={player.name}
                                >
                                    {player.name}
                                </Autocomplete.Item>
                            ))}
                        </Autocomplete>
                    </div>

                    <div className="flex justify-center items-center text-slate-300 font-bold">
                        VS
                    </div>

                    <div className="grid md:col-span-3 gap-2">
                        <Autocomplete placeholder={TEXT.PLAYER}>
                            {players.map(player => (
                                <Autocomplete.Item
                                    key={player.id}
                                    id={player.id}
                                    textValue={player.name}
                                >
                                    {player.name}
                                </Autocomplete.Item>
                            ))}
                        </Autocomplete>
                        <Autocomplete placeholder={TEXT.PLAYER}>
                            {players.map(player => (
                                <Autocomplete.Item
                                    key={player.id}
                                    id={player.id}
                                    textValue={player.name}
                                >
                                    {player.name}
                                </Autocomplete.Item>
                            ))}
                        </Autocomplete>
                    </div>
                </div>
            </Card.Content>
        </Card>
    );
}
