import { ROUTE } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../fetchData";
import { convertKeysToCamelCase } from "@/utils";
import { IMatch } from "@/types";

export const useMatch = () => {
    const endpoint = ROUTE.MATCH;
    const queryKey = ["match"];

    const { isPending, data: matches = [] } = useQuery<IMatch, Error, IMatch[]>({
        queryKey,
        queryFn: () => fetchData(endpoint).then(res => convertKeysToCamelCase(res.data)),
    });

    return {
        matches,

        isLoading: isPending,
    };
};
