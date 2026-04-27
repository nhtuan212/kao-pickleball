import { create } from "zustand";
import { ModalBackdropProps, ModalContainerProps } from "@heroui/react";

interface ModalProps extends ModalBackdropProps, ModalContainerProps {
    isClose?: boolean;
    header?: React.ReactNode;
    body?: React.ReactNode;
    footer?: React.ReactNode;
}

interface ModalState {
    modal: ModalProps;
}

interface ModalAction {
    setModal: ({ isOpen, isClose, header, body, footer }: ModalProps) => void;
    closeModal: () => void;
}

const initialState: ModalState = {
    modal: {
        isClose: true,
        placement: "center",
        size: "md",
    },
};

export const useModalStore = create<ModalState & ModalAction>(set => ({
    ...initialState,

    setModal: props => set(() => ({ modal: { ...initialState.modal, ...props } })),
    closeModal: () => set(() => ({ ...initialState })),
}));
