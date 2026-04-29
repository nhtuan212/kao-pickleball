import { ROUTE } from "@/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "../fetchData";
import { convertKeysToCamelCase } from "@/utils";
import { IMatch } from "@/types";

export const useMatch = () => {
    const endpoint = ROUTE.MATCH;
    const queryKey = ["match"];
    const queryClient = useQueryClient();

    const { isPending, data: matches = [] } = useQuery<IMatch, Error, IMatch[]>({
        queryKey,
        queryFn: () => fetchData(endpoint).then(res => convertKeysToCamelCase(res.data)),
    });

    const { isPending: isCreating, mutateAsync: createMatch } = useMutation<IMatch, Error, IMatch>({
        mutationFn: body =>
            fetchData(endpoint, {
                method: "POST",
                body: JSON.stringify(body),
            }).then(res => convertKeysToCamelCase(res.data)),
        onSuccess: res => {
            queryClient.setQueriesData({ queryKey }, (prev: IMatch[]) => [
                convertKeysToCamelCase(res),
                ...prev,
            ]);
        },
    });

    const { isPending: isUpdating, mutateAsync: updateMatch } = useMutation<IMatch, Error, IMatch>({
        mutationFn: body =>
            fetchData(endpoint, {
                method: "POST",
                body: JSON.stringify(body),
            }).then(res => convertKeysToCamelCase(res.data)),
        onSuccess: res => {
            queryClient.setQueriesData({ queryKey }, (prev: IMatch[]) => {
                prev.map(prev => (prev.id === res.id ? res : prev));
            });
        },
    });

    const { isPending: isDeleting, mutateAsync: deleteMatch } = useMutation<
        IMatch,
        Error,
        IMatch["id"]
    >({
        mutationFn: (id: IMatch["id"]) =>
            fetchData(`${endpoint}/${id}`, {
                method: "DELETE",
            }).then(res => convertKeysToCamelCase(res.data)),
        onSuccess: res => {
            queryClient.setQueriesData({ queryKey }, (prev: IMatch[]) =>
                prev.filter(prev => prev.id !== res.id),
            );
        },
    });

    return {
        matches,
        createMatch,
        updateMatch,
        deleteMatch,

        isLoading: isPending || isCreating || isUpdating || isDeleting,
    };
};
