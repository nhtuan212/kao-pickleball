export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const STATUS_CODE = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    INVALID: 409,
};

export const ROLE = {
    ADMIN: "ADMIN",
    MANAGER: "MANAGER",
    REPORT: "REPORT",
    STAFF: "STAFF",
};

export const ROUTE = {
    HOME: "/",
    LOGIN: "/login",
    PLAYER: "/player",
};

export * from "./text";
