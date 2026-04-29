"use client";

import MatchItem from "./MatchItem";
import MatchForm from "./MatchForm";
import Button from "@/components/Button";
import { Plus } from "lucide-react";
import { useModalStore } from "@/stores";
import { useMatch } from "@/hooks/queries";
import { TEXT } from "@/constants";

export default function Match() {
    //** Stores */
    const { setModal } = useModalStore();

    //** Queries */
    const { matches } = useMatch();

    //** Render */
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center gap-2">
                <h3 className="title">{TEXT.MATCH}</h3>
                <Button
                    size="sm"
                    onPress={() =>
                        setModal({
                            isOpen: true,
                            header: (
                                <div className="first-letter:uppercase lowercase">
                                    {`${TEXT.ADD} ${TEXT.MATCH}`}
                                </div>
                            ),
                            body: <MatchForm />,
                        })
                    }
                >
                    <Plus />
                    {TEXT.MATCH}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {matches.map(match => (
                    <MatchItem key={match.id} match={match} />
                ))}
            </div>
        </div>
    );
}
