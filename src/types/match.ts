import { IGame } from ".";
export interface IMatch {
    id: string;
    name: string;
    date: string;
    location: string;
    player: number;
    court: number;
    description: string;
    startTime: string;
    endTime: string;

    games: IGame[];
}
