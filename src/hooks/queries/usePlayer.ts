import { useQuery } from "@tanstack/react-query";
import { fetchData } from "..";
import { convertKeysToCamelCase } from "@/utils";
import { ROUTE } from "@/constants";

export const usePlayer = () => {
    const queryKey = "player";
    const endpoint = ROUTE.PLAYER;

    const { isPending, data: players } = useQuery({
        queryKey: [queryKey],
        queryFn: () => fetchData(endpoint).then(res => convertKeysToCamelCase(res)),
    });

    return {
        players,

        isLoading: isPending,
    };
};
