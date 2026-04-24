import { create } from "zustand";
import { Session } from "next-auth";
import { IProfile } from "@/types";

interface IProfileState {
    profile: IProfile | null;
}

interface IProfileAction {
    setProfile: (session: Session) => void;
}

const initialState: IProfileState = {
    profile: null,
};

export const useProfileStore = create<IProfileState & IProfileAction>(set => ({
    ...initialState,

    setProfile: session =>
        set(() => ({
            profile: session.user,
        })),
}));
