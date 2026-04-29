import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "../fetchData";
import { ROUTE } from "@/constants";
import { convertKeysToCamelCase } from "@/utils";
import { ICheckIn, IMatch, IPlayer } from "@/types";

export const useCheckIn = (matchId?: IMatch["id"]) => {
    const endpoint = ROUTE.CHECK_IN;
    const queryKey = ["checkIn", matchId];
    const queryClient = useQueryClient();

    const { isPending, data: checkInPlayers = [] } = useQuery<ICheckIn, Error, ICheckIn[]>({
        queryKey,
        queryFn: () =>
            fetchData(`${endpoint}?matchId=${matchId}`).then(res =>
                convertKeysToCamelCase(res.data),
            ),
    });

    const { isPending: isCreating, mutateAsync: createCheckIn } = useMutation({
        mutationFn: (body: Pick<ICheckIn, "matchId" | "playerId" | "checkIn">) =>
            fetchData(endpoint, {
                method: "POST",
                body: JSON.stringify(body),
            }).then(res => convertKeysToCamelCase(res.data)),
        onSuccess: res => {
            //** Combine res to match with player response */
            const player = queryClient
                .getQueryData<IPlayer[]>(["player"])
                ?.find(p => p.id === res.playerId);

            const newCheckIn = {
                ...res,
                name: player?.name,
                phone: player?.phone,
                level: player?.level,
                gender: player?.gender,
                isActive: player?.isActive,
            };

            queryClient.setQueryData(queryKey, (prev: ICheckIn[]) => [newCheckIn, ...prev]);
        },
    });

    const { isPending: isDeleting, mutateAsync: deleteCheckIn } = useMutation({
        mutationFn: (id: ICheckIn["id"]) =>
            fetchData(`${endpoint}/${id}`, {
                method: "DELETE",
            }).then(res => convertKeysToCamelCase(res.data)),
        onSuccess: res => {
            queryClient.setQueriesData({ queryKey }, (prev: ICheckIn[]) =>
                prev.filter(c => c.id !== res.id),
            );
        },
    });

    return {
        checkInPlayers,
        createCheckIn,
        deleteCheckIn,

        isLoading: isPending || isCreating || isDeleting,
    };
};
