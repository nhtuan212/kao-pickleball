import { getCookie } from "@/utils/getCookie";
import { signOut } from "next-auth/react";
import { BASE_URL, PUBLIC_ROUTES, STATUS_CODE } from "@/constants";

export const fetchData = async (endpoint: string | URL, options?: RequestInit) => {
    const { accessToken } = await getCookie();
    const url = `${BASE_URL}${endpoint}`;

    const isPublic = PUBLIC_ROUTES.some(e => endpoint.toString().startsWith(e));

    return await fetch(url, {
        headers: {
            Accept: "application/json",
            ...(!isPublic && accessToken && { Authorization: `Bearer ${accessToken}` }),
            "Content-Type": "application/json",
        },
        ...options,
    })
        .then(async res => {
            if (res.status === STATUS_CODE.UNAUTHORIZED) {
                return await signOut();
            }

            return res.json();
        })
        .catch(() => {
            throw new Error("Failed to fetch data");
        });
};
