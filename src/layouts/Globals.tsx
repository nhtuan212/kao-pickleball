import { Drawer } from "@/components/Drawer";
import { ToastProvider } from "@/components/Toast";
import { useDrawerStore } from "@/stores";

export default function Globals() {
    //** Stores */
    const { drawer } = useDrawerStore();

    //** Render */
    return (
        <>
            <ToastProvider placement="top end" />

            {drawer.isOpen && (
                <Drawer {...drawer}>
                    <Drawer.Header>{drawer.header}</Drawer.Header>
                    <Drawer.Body>{drawer.body}</Drawer.Body>
                    <Drawer.Footer>{drawer.footer}</Drawer.Footer>
                </Drawer>
            )}
        </>
    );
}
