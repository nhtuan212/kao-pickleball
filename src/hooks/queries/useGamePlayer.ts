import { useMutation, useQuery } from "@tanstack/react-query";
import { ROUTE } from "@/constants";
import { fetchData } from "../fetchData";
import { convertKeysToCamelCase } from "@/utils";
import { IGamePlayer } from "@/types";

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

export const useCreateGamePlayer = () => {
    const { isPending: isCreating, mutateAsync: createGamePlayer } = useMutation({
        mutationFn: (body: Pick<IGamePlayer, "gameId" | "playerId" | "team">) =>
            fetchData(endpoint, {
                method: "POST",
                body: JSON.stringify(body),
            }).then(res => convertKeysToCamelCase(res.data)),
    });

    return {
        createGamePlayer,
        isCreating,
    };
};

export const useDeleteGamePlayer = () => {
    const { isPending: isDeleting, mutateAsync: deleteGamePlayer } = useMutation({
        mutationFn: (id: IGamePlayer["id"]) =>
            fetchData(`${endpoint}/${id}`, {
                method: "DELETE",
            }).then(res => convertKeysToCamelCase(res.data)),
    });

    return {
        deleteGamePlayer,
        isDeleting,
    };
};
