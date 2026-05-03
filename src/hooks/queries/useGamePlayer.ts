import { useQuery } from "@tanstack/react-query";
import { ROUTE } from "@/constants";
import { fetchData } from "../fetchData";
import { convertKeysToCamelCase } from "@/utils";

const endpoint = ROUTE.GAME_PLAYER;
const queryKey = ["gamePlayer"];

export const useGamePlayer = () => {
    const { isPending, data: gamePlayers } = useQuery({
        queryKey,
        queryFn: () => fetchData(endpoint).then(res => convertKeysToCamelCase(res.data)),
        refetchOnWindowFocus: false,
    });

    return {
        gamePlayers,
        isPending,
    };
};
