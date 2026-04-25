"use client";

import Button from "@/components/Button";
import { Plus } from "lucide-react";
import Table from "@/components/Table";
import { usePlayer } from "@/hooks/queries";
import { usePlayerColumn } from "@/hooks/columns";
import { TEXT } from "@/constants";

export default function Player() {
    //** Queries */
    const { isLoading, players } = usePlayer();

    //** Render */
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center gap-2">
                <h3 className="title">{TEXT.PLAYER}</h3>
                <Button size="sm">
                    <Plus />
                    {TEXT.PLAYER}
                </Button>
            </div>

            <Table rows={players} columns={usePlayerColumn()} loading={isLoading} />
        </div>
    );
}
