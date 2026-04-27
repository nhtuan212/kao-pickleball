import { Drawer } from "@/components/Drawer";
import { Modal } from "@/components/Modal";
import { ToastProvider } from "@/components/Toast";

export default function Globals() {
    //** Render */
    return (
        <>
            <ToastProvider placement="top end" />
            <Drawer />
            <Modal />
        </>
    );
}
