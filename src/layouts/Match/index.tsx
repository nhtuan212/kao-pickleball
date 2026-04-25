"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import { Calendar, Clock, PanelsTopLeft, Play, Plus, UserCheck, Users } from "lucide-react";
import { useMatch } from "@/hooks/queries";
import { formatDate } from "@/utils";
import { TEXT } from "@/constants";

export default function Match() {
    //** Queries */
    const { matches } = useMatch();

    //** Render */
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center gap-2">
                <h3 className="title">{TEXT.MATCH}</h3>
                <Button size="sm">
                    <Plus />
                    {TEXT.MATCH}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {matches.map(match => (
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
                            <Button size="sm" className="flex-1 bg-white" variant="outline">
                                <UserCheck className="w-4 h-4" />
                                {TEXT.CHECK_IN}
                            </Button>
                            <Button size="sm" className="flex-1">
                                <Play className="w-4 h-4" />
                                {TEXT.START}
                            </Button>
                        </Card.Footer>
                    </Card>
                ))}
            </div>
        </div>
    );
}
