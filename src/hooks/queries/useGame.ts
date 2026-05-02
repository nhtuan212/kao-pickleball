import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "../fetchData";
import { convertKeysToCamelCase } from "@/utils";
import { ROUTE } from "@/constants";
import { ICompleteGame, IGame, IMatch } from "@/types";

const queryKey = ["game"];

export const useGame = (matchId?: IMatch["id"]) => {
    const queryClient = useQueryClient();
    const endpoint = ROUTE.GAME;

    const { isPending, data: games } = useQuery<IGame, Error, IGame[]>({
        queryKey,
        queryFn: () =>
            fetchData(`${ROUTE.MATCH}/${matchId}/game`).then(res =>
                convertKeysToCamelCase(res.data),
            ),
        enabled: !!matchId,
    });

    const { isPending: isCreating, mutateAsync: createGame } = useMutation<
        IGame,
        Error,
        Pick<IGame, "matchId" | "courtNumber" | "players">
    >({
        mutationFn: body =>
            fetchData(endpoint, {
                method: "POST",
                body: JSON.stringify(body),
            }).then(res => convertKeysToCamelCase(res.data)),
        onSuccess: res => {
            queryClient.setQueriesData({ queryKey }, (prev: IGame[]) => [res, ...prev]);
        },
    });

    return {
        games,
        createGame,

        isLoading: isPending || isCreating,
    };
};

export const useCompletedGame = () => {
    const queryClient = useQueryClient();
    const endpoint = ROUTE.COMPLETED;

    const { isPending: isUpdating, mutateAsync: completedGame } = useMutation({
        mutationFn: ({ id, body }: { id: IGame["id"]; body: ICompleteGame }) =>
            fetchData(`${endpoint}/${id}`, {
                method: "PUT",
                body: JSON.stringify(body),
            }).then(res => convertKeysToCamelCase(res.data)),
        onSuccess: res => {
            queryClient.setQueriesData({ queryKey }, (prev: IGame[]) => {
                return prev.filter(prev => prev.id !== res.id);
            });
        },
    });

    return {
        completedGame,
        isUpdating,
    };
};
