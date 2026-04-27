import { useEffect } from "react";
import { Drawer as DrawerHeroUI, Button, useOverlayState } from "@heroui/react";
import { useDrawerStore } from "@/stores";

const Drawer = () => {
    //** Stores */
    const { drawer, closeDrawer } = useDrawerStore();

    const { isOpen, isClose, placement, header, body, footer, ...drawerProps } = drawer;

    //** Variables */
    const state = useOverlayState({
        onOpenChange: isOpen => !isOpen && closeDrawer(),
    });
    const { open, close } = state;

    //** Effects */
    useEffect(() => {
        isOpen ? open() : close();
    }, [isOpen, open, close]);

    //** Render */
    return (
        <DrawerHeroUI state={state}>
            {/* This is a must to bypass the PressResponder error */}
            <Button className="hidden" />

            <DrawerHeroUI.Backdrop {...drawerProps}>
                <DrawerHeroUI.Content placement={placement}>
                    <DrawerHeroUI.Dialog>
                        {isClose && <DrawerHeroUI.CloseTrigger />}
                        <DrawerHeroUI.Header>{header}</DrawerHeroUI.Header>
                        <DrawerHeroUI.Body>{body}</DrawerHeroUI.Body>
                        <DrawerHeroUI.Footer>{footer}</DrawerHeroUI.Footer>
                    </DrawerHeroUI.Dialog>
                </DrawerHeroUI.Content>
            </DrawerHeroUI.Backdrop>
        </DrawerHeroUI>
    );
};

export { Drawer };
