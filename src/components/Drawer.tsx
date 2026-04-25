import { useDrawerStore } from "@/stores";
import { Drawer as DrawerHeroUI, DrawerContentProps, Button } from "@heroui/react";

const Drawer = ({
    isOpen,
    isClose,
    isDismissable = true,
    className = "w-xs",
    placement = "left",
    children,
}: {
    isOpen?: boolean;
    isClose?: boolean;
    isDismissable?: boolean;
    className?: string;
    placement?: DrawerContentProps["placement"];
    children: React.ReactNode;
}) => {
    //** Stores */
    const { closeDrawer } = useDrawerStore();

    //** Render */
    return (
        <DrawerHeroUI>
            {/* This is a must to bypass the PressResponder error */}
            <Button className="hidden" />

            <DrawerHeroUI.Backdrop
                isDismissable={isDismissable}
                isOpen={isOpen}
                onOpenChange={() => closeDrawer()}
            >
                <DrawerHeroUI.Content className={className} placement={placement}>
                    <DrawerHeroUI.Dialog>
                        {isClose && <DrawerHeroUI.CloseTrigger />}
                        {children}
                    </DrawerHeroUI.Dialog>
                </DrawerHeroUI.Content>
            </DrawerHeroUI.Backdrop>
        </DrawerHeroUI>
    );
};

Drawer.Header = DrawerHeroUI.Header;
Drawer.Body = DrawerHeroUI.Body;
Drawer.Footer = DrawerHeroUI.Footer;

export { Drawer };
