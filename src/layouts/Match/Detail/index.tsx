"use client";

import { useRouter } from "next/navigation";
import Chip from "@/components/Chip";
import PlayerInMatch from "@/layouts/Player/PlayerInMatch";
import Button from "@/components/Button";
import { Tab } from "@/components/Tab";
import { ArrowLeft, Users } from "lucide-react";
import { useMatch } from "@/hooks/queries";
import { formatDate } from "@/utils";
import { ROUTE, TEXT } from "@/constants";
import { IMatch } from "@/types";

export default function MatchDetail({ slug }: { slug: IMatch["id"] }) {
    const router = useRouter();

    //** Queries */
    const { match } = useMatch(slug);

    //** Tab configs */
    const TABS = [
        {
            id: TEXT.MATCH,
            label: TEXT.MATCH,
            content: <p>View your project overview and recent activity.</p>,
        },
        {
            id: TEXT.PLAYER,
            label: TEXT.PLAYER,
            content: <PlayerInMatch matchId={slug} />,
        },
        {
            id: TEXT.HISTORY,
            label: TEXT.HISTORY,
            content: <p>Generate and download detailed reports.</p>,
        },
    ];

    //** Return */
    if (!match) return null;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 md:gap-4 shrink-0">
                <Button variant="ghost" isIconOnly onPress={() => router.push(ROUTE.MATCH)}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>

                <div className="flex-1">
                    <h3 className="font-semibold text-xl">{match.name}</h3>
                    <span className="text-sm text-slate-700">{`${formatDate(match.date)} • ${match.startTime} - ${match.endTime}`}</span>
                </div>

                <div className="flex items-center gap-2">
                    <Chip className="gap-2">
                        <Users className="w-4 h-4" />
                        {`${match.player} ${TEXT.PLAYER}`}
                    </Chip>

                    <Button variant="danger-soft">{TEXT.END}</Button>
                </div>
            </div>

            <Tab
                panels={TABS.map(tab => (
                    <Tab.Panel key={tab.id} id={tab.id}>
                        {tab.content}
                    </Tab.Panel>
                ))}
            >
                {TABS.map(tab => (
                    <Tab.Tab key={tab.id} id={tab.id}>
                        {tab.label}
                    </Tab.Tab>
                ))}
            </Tab>
        </div>
    );
}
