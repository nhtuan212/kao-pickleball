import { Session } from "next-auth";
import { create } from "zustand";

interface IProfileState {
    profile: object | null;
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
