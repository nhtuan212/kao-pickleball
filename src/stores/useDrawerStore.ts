import React from "react";
import { create } from "zustand";
import { DrawerBackdropProps, DrawerContentProps } from "@heroui/react";

interface DrawerProps extends DrawerBackdropProps, DrawerContentProps {
    isClose?: boolean;
    header?: React.ReactNode;
    body?: React.ReactNode;
    footer?: React.ReactNode;
}

interface IDrawerState {
    drawer: DrawerProps;
}

interface IDrawerAction {
    setDrawer: ({
        isClose,
        header,
        body,
        footer,
    }: DrawerProps & DrawerContentProps & DrawerBackdropProps) => void;
    closeDrawer: () => void;
}

const initialState: IDrawerState = {
    drawer: {
        isClose: false,
        placement: "left",
    },
};

export const useDrawerStore = create<IDrawerState & IDrawerAction>(set => ({
    ...initialState,

    setDrawer: props => {
        return set(() => ({
            drawer: { ...initialState.drawer, ...props },
        }));
    },
    closeDrawer: () => set(() => ({ ...initialState })),
}));
