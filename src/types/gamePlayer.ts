import { IGame } from "./game";
import { IPlayer } from "./player";

export interface IGamePlayer {
    id: string;
    gameId: IGame["id"];
    playerId: string;
    score: number;
    result: "win" | "lose";
    name: string;
    gender: "Men" | "Women";
    level: number;
    team: number;
}

export interface ICompleteGame {
    team1: {
        score: IGamePlayer["score"];
        players: IPlayer["id"][];
    };
    team2: {
        score: IGamePlayer["score"];
        players: IPlayer["id"][];
    };
}
