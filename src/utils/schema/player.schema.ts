import * as z from "zod";
import { TEXT } from "@/constants";

export const playerSchema = z.object({
    name: z.string().min(1, { error: TEXT.FIELD_REQUIRED }).default(""),
    phone: z.string().min(1, { error: TEXT.FIELD_REQUIRED }).default(""),
    gender: z.enum(["Men", "Women"], { error: TEXT.FIELD_REQUIRED }).default("Men"),
    level: z.coerce.number().min(1, { error: TEXT.FIELD_REQUIRED }).default(2),
    isActive: z.boolean().default(true),
});
