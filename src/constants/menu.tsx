import { Award, Users } from "lucide-react";
import { ROLE, ROUTE, TEXT } from "@/constants";
import { IMenu } from "@/types";

export const MENU: IMenu[] = [
    {
        url: ROUTE.MATCH,
        label: TEXT.MATCH,
        icon: <Award className="w-5 h-5" />,
        roles: [ROLE.ADMIN, ROLE.REPORT],
    },
    {
        url: ROUTE.PLAYER,
        label: TEXT.PLAYER,
        icon: <Users className="w-5 h-5" />,
        roles: [ROLE.ADMIN],
    },
];
