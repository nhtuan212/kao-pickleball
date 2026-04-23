import { ToastContentValue, Toast as ToastHeroUI, ToastQueue, ToastVariants } from "@heroui/react";

const toastQueue = new ToastQueue({ maxVisibleToasts: 3 });

// Provider — đặt trong layout
export const ToastProvider = ({ placement }: { placement: ToastVariants["placement"] }) => {
    return <ToastHeroUI.Provider placement={placement} queue={toastQueue} />;
};

// Function to trigger toast
export const toast = ({ title, description, variant = "success" }: ToastContentValue) => {
    toastQueue.add({
        title,
        description,
        variant,
    });
};
