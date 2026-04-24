"use server";

import { cookies } from "next/headers";

export const getCookie = async () => {
    const cookie = await cookies();

    const accessToken = cookie.get("accessToken")?.value || "";

    return {
        accessToken,
    };
};
