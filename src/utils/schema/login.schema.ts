import * as z from "zod";
import { TEXT } from "@/constants";

export const loginSchema = z.object({
    username: z.string().min(1, { error: TEXT.FIELD_REQUIRED }),
    password: z.string().min(1, { error: TEXT.FIELD_REQUIRED }),
});
