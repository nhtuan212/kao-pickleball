import { ErrorOption } from "react-hook-form";

export interface IField {
    label?: React.ReactNode;
    labelClassName?: string;
    icon?: React.ReactNode;
    errorMessage?: ErrorOption;
}
export interface ILogin {
    id: string;
    username: string;
    role: string;
    isActive: string;
    accessToken: string;
}

export interface IProfile {
    exp: number;
    iat: number;
    id: string;
    isActive: boolean;
    jti: string;
    role: "ADMIN" | "USER";
    sub?: string;
    username: string;
}

export interface IMenu {
    url: string;
    label: string;
    icon: React.ReactNode;
    roles: string[];
}

export * from "./match";
export * from "./player";
export * from "./checkIn";
