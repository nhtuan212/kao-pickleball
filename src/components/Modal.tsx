import Button from "./Button";
import { useModalStore } from "@/stores";
import { Modal as ModalHeroUI, useOverlayState } from "@heroui/react";
import { useEffect } from "react";

const Modal = () => {
    //** Stores */
    const { modal, closeModal } = useModalStore();

    const { isOpen, isClose, size, placement, header, body, footer, ...modalProps } = modal;

    //** Variables */
    const state = useOverlayState({
        onOpenChange: isOpen => !isOpen && closeModal(),
    });
    const { open, close } = state;

    //** Effects */
    useEffect(() => {
        isOpen ? open() : close();
    }, [isOpen, open, close]);

    //** Return */
    return (
        <ModalHeroUI state={state}>
            {/* This is a must to bypass the PressResponder error */}
            <Button className="hidden" />

            <ModalHeroUI.Backdrop {...modalProps}>
                <ModalHeroUI.Container size={size} placement={placement}>
                    <ModalHeroUI.Dialog>
                        {isClose && <ModalHeroUI.CloseTrigger />}
                        <ModalHeroUI.Header>{header}</ModalHeroUI.Header>
                        <ModalHeroUI.Body>{body}</ModalHeroUI.Body>
                        <ModalHeroUI.Footer>{footer}</ModalHeroUI.Footer>
                    </ModalHeroUI.Dialog>
                </ModalHeroUI.Container>
            </ModalHeroUI.Backdrop>
        </ModalHeroUI>
    );
};

export { Modal };
