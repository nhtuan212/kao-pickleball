import MatchForm from "./MatchForm";
import CheckInPlayer from "../Player/CheckInPlayer";
import ConfirmModal from "@/components/ConfirmModal";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { toast } from "@/components/Toast";
import { Calendar, Clock, Edit, PanelsTopLeft, Play, Trash, UserCheck, Users } from "lucide-react";
import { useModalStore } from "@/stores";
import { useMatch } from "@/hooks/queries";
import { formatDate } from "@/utils";
import { TEXT } from "@/constants";
import { IMatch } from "@/types";

export default function MatchItem({ match }: { match: IMatch }) {
    //** Stores */
    const { setModal, closeModal } = useModalStore();

    //** Queries */
    const { deleteMatch } = useMatch();

    //** Functions */
    const handleDeleteMatch = async () => {
        await deleteMatch(match.id);

        toast({
            title: `${TEXT.DELETE} ${TEXT.SUCCESSFULLY}`,
        });

        closeModal();
    };

    //** Render */
    return (
        <Card key={match.id} className="bg-slate-50 gap-0 p-0 *:p-3 border">
            <Card.Header className="border-b">
                <div className="flex items-center gap-2">
                    <div className="flex-1">{match.name}</div>
                    <div>
                        <Button
                            size="sm"
                            variant="ghost"
                            isIconOnly
                            onPress={() =>
                                setModal({
                                    isOpen: true,
                                    header: (
                                        <div className="first-letter:uppercase lowercase">
                                            {`${TEXT.ADD} ${TEXT.MATCH}`}
                                        </div>
                                    ),
                                    body: <MatchForm match={match} />,
                                })
                            }
                        >
                            <Edit />
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            isIconOnly
                            onPress={() =>
                                setModal({
                                    isOpen: true,
                                    header: TEXT.CONFIRM_DELETE,
                                    body: (
                                        <ConfirmModal onConfirm={async () => handleDeleteMatch()} />
                                    ),
                                })
                            }
                        >
                            <Trash />
                        </Button>
                    </div>
                </div>
            </Card.Header>
            <Card.Content className="gap-y-2 bg-white">
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(match.date)}
                </div>

                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {`${match.startTime} - ${match.endTime}`}
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <b>{match.player}</b>
                    </div>
                    <div className="flex items-center gap-2">
                        <PanelsTopLeft className="w-4 h-4" />
                        <b>{match.court}</b>
                    </div>
                </div>
            </Card.Content>
            <Card.Footer className="gap-2 border-t">
                <Button
                    size="sm"
                    className="flex-1 bg-white"
                    variant="outline"
                    onPress={() =>
                        setModal({
                            isOpen: true,
                            header: (
                                <h3 className="text-xl font-medium">{`${TEXT.CHECK_IN} ${TEXT.PLAYER}`}</h3>
                            ),
                            body: <CheckInPlayer matchId={match.id} />,
                        })
                    }
                >
                    <UserCheck className="w-4 h-4" />
                    {TEXT.CHECK_IN}
                </Button>
                <Button size="sm" className="flex-1">
                    <Play className="w-4 h-4" />
                    {TEXT.START}
                </Button>
            </Card.Footer>
        </Card>
    );
}
