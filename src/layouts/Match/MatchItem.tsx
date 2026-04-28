import Card from "@/components/Card";
import CheckInPlayer from "../Player/CheckInPlayer";
import Button from "@/components/Button";
import { Calendar, Clock, PanelsTopLeft, Play, UserCheck, Users } from "lucide-react";
import { useModalStore } from "@/stores";
import { formatDate } from "@/utils";
import { TEXT } from "@/constants";
import { IMatch } from "@/types";

export default function MatchItem({ match }: { match: IMatch }) {
    //** Stores */
    const { setModal } = useModalStore();

    //** Render */
    return (
        <Card key={match.id} className="bg-slate-50 gap-0 p-0 *:p-3 border">
            <Card.Header className="border-b">{match.name}</Card.Header>
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
