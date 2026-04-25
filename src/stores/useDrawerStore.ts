import React from "react";
import { create } from "zustand";

interface DrawerProps {
    isOpen: boolean;
    isClose?: boolean;
    header?: React.ReactNode;
    body: React.ReactNode;
    footer?: React.ReactNode;
}

interface IDrawerState {
    drawer: DrawerProps;
}

interface IDrawerAction {
    setDrawer: ({ isOpen, isClose, header, body, footer }: DrawerProps) => void;
    closeDrawer: () => void;
}

const initialState: IDrawerState = {
    drawer: {
        isOpen: false,
        isClose: false,
        header: "",
        body: "",
        footer: "",
    },
};

export const useDrawerStore = create<IDrawerState & IDrawerAction>(set => ({
    ...initialState,

    setDrawer: props => {
        return set(() => ({
            drawer: {
                ...props,
            },
        }));
    },

    closeDrawer: () => set(() => ({ ...initialState })),
}));
