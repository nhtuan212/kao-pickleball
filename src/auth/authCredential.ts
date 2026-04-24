import CredentialsProvider from "next-auth/providers/credentials";
import { fetchData } from "@/hooks";
import { ROUTE, STATUS_CODE } from "@/constants";

export const authCredential = [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            username: { label: "Username", type: "text" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            const { username, password } = credentials || {};

            const endpoint = ROUTE.LOGIN;
            const body = { username, password };

            return fetchData(endpoint, {
                method: "POST",
                body: JSON.stringify(body),
            }).then(res => {
                if (res.status !== STATUS_CODE.OK) {
                    return null;
                }

                return res;
            });
        },
    }),
];
