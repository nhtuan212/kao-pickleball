import CourtForm from "./CourtForm";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { Plus } from "lucide-react";
import { useGame } from "@/hooks/queries";
import { TEXT } from "@/constants";
import { ICheckIn, IGame, IMatch } from "@/types";

export default function CourtItem({
    matchId,
    players,
    court,
    game,
}: {
    matchId: IMatch["id"];
    players: ICheckIn[];
    court: number;
    game?: IGame;
}) {
    //** Queries */
    const { createGame } = useGame();

    //** Functions */
    const handleCreateGame = () => {
        createGame({ matchId, courtNumber: court });
    };

    //** Return */
    const renderContentCourt = () => {
        if (!game) {
            return (
                <Button
                    className="flex-col w-full h-full"
                    variant="outline"
                    onPress={() => handleCreateGame()}
                >
                    <Plus className="w-6 h-6" />
                    <p className="first-letter:uppercase lowercase text-black">{`${TEXT.ADD} ${TEXT.MATCH}`}</p>
                </Button>
            );
        }

        return <CourtForm game={game} players={players} />;
    };

    return (
        <Card className="p-0 border rounded-lg">
            <Card.Header className="bg-primary-200 p-4 rounded-tr-lg">
                <h3>{`${TEXT.COURT} ${court}`}</h3>
            </Card.Header>

            <Card.Content className="min-h-60 p-4">{renderContentCourt()}</Card.Content>
        </Card>
    );
}
