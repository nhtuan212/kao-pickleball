import * as z from "zod";
import { TEXT } from "@/constants";
import { getCurrentTime, getToday } from "../date";

export const matchSchema = z.object({
    date: z
        .any()
        .refine(val => !!val, { message: TEXT.FIELD_REQUIRED })
        .transform(val => val?.toString() || "")
        .default(getToday()),
    name: z.string().min(1, { error: TEXT.FIELD_REQUIRED }).default(""),
    location: z.string().optional().default(""),
    startTime: z
        .any()
        .refine(val => !!val, { message: TEXT.FIELD_REQUIRED })
        .transform(val => val?.toString() || "")
        .default(getCurrentTime()),
    endTime: z
        .any()
        .refine(val => !!val, { message: TEXT.FIELD_REQUIRED })
        .transform(val => val?.toString() || "")
        .default(getCurrentTime()),
    player: z.coerce.number().min(1, { error: TEXT.FIELD_REQUIRED }).default(28),
    court: z.coerce.number().min(1, { error: TEXT.FIELD_REQUIRED }).default(4),
    description: z.string().optional().default(""),
});
