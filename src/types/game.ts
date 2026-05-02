import { IGamePlayer, IMatch } from ".";

export interface IGame {
    id: string;
    matchId: IMatch["id"];
    courtNumber: number;
    players?: IGamePlayer[];
    status: "ongoing" | "completed";
}
