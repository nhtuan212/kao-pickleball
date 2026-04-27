"use client";

import TopContent from "./TopContent";
import Table from "@/components/Table";
import { usePlayer } from "@/hooks/queries";
import { usePlayerColumn } from "@/hooks/columns";

export default function Player() {
    //** Queries */
    const { isLoading, players } = usePlayer();

    //** Render */
    return (
        <Table
            loading={isLoading}
            rows={players}
            columns={usePlayerColumn()}
            topContent={<TopContent />}
        />
    );
}
