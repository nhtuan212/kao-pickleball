import z from "zod";
import { TEXT } from "@/constants";

export const gamePlayerSchema = z.object({
    team1: z
        .object({
            players: z.array(z.string({ error: TEXT.FIELD_REQUIRED })).min(1, TEXT.FIELD_REQUIRED),
            score: z.coerce.number().optional().default(0),
        })
        .default({ players: [], score: 0 }),
    team2: z
        .object({
            players: z.array(z.string({ error: TEXT.FIELD_REQUIRED })).min(1, TEXT.FIELD_REQUIRED),
            score: z.coerce.number().optional().default(0),
        })
        .default({ players: [], score: 0 }),
});

export type IGamePlayerForm = z.infer<typeof gamePlayerSchema>;
