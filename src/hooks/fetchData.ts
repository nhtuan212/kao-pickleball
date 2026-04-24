import { getCookie } from "@/utils/getCookie";
import { BASE_URL, PUBLIC_ROUTES } from "@/constants";

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
        .then(res => res.json())
        .catch(() => {
            throw new Error("Failed to fetch data");
        });
};
