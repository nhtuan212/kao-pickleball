import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "..";
import { convertKeysToCamelCase } from "@/utils";
import { ROUTE } from "@/constants";
import { IPlayer } from "@/types";

export const usePlayer = () => {
    const queryClient = useQueryClient();
    const queryKey = ["player"];
    const endpoint = ROUTE.PLAYER;

    const { isPending, data: players } = useQuery({
        queryKey,
        queryFn: () => fetchData(endpoint).then(res => convertKeysToCamelCase(res.data)),
    });

    const { isPending: isCreating, mutateAsync: createPlayer } = useMutation<
        IPlayer,
        Error,
        IPlayer
    >({
        mutationFn: (body: IPlayer) =>
            fetchData(endpoint, {
                method: "POST",
                body: JSON.stringify(body),
            }).then(res => convertKeysToCamelCase(res.data)),
        onSuccess: res => {
            queryClient.setQueriesData({ queryKey }, (prev: IPlayer[]) => [
                convertKeysToCamelCase(res),
                ...prev,
            ]);
        },
    });

    const { isPending: isUpdating, mutateAsync: updatePlayer } = useMutation<
        IPlayer,
        Error,
        { id: IPlayer["id"]; body: IPlayer }
    >({
        mutationFn: ({ id, body }) =>
            fetchData(`${endpoint}/${id}`, {
                method: "PUT",
                body: JSON.stringify(body),
            }).then(res => convertKeysToCamelCase(res.data)),
        onSuccess: res => {
            queryClient.setQueriesData({ queryKey }, (prev: IPlayer[]) =>
                prev.map(player => (player.id === res.id ? res : player)),
            );
        },
    });

    const { isPending: isDelete, mutateAsync: deletePlayer } = useMutation<
        void,
        Error,
        IPlayer["id"]
    >({
        mutationFn: id =>
            fetchData(`${endpoint}/${id}`, {
                method: "DELETE",
            }).then(res => convertKeysToCamelCase(res.data)),
        onSuccess: (_, id) => {
            queryClient.setQueriesData({ queryKey }, (prev: IPlayer[]) =>
                prev.filter(player => player.id !== id),
            );
        },
    });

    return {
        players,
        createPlayer,
        updatePlayer,
        deletePlayer,

        isLoading: isPending || isCreating || isUpdating || isDelete,
    };
};
