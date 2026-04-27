import React from "react";
import Button from "@/components/Button";
import { useModalStore } from "@/stores";
import { TEXT } from "@/constants";

function ConfirmModal({
    isDisabled,
    content,
    onConfirm,
}: {
    isDisabled?: boolean;
    content?: React.ReactNode;
    onConfirm: () => Promise<void>;
}) {
    //** Stores */
    const { closeModal } = useModalStore();

    //** Render */
    return (
        <div className="flex flex-col gap-4">
            {content && content}

            <div className="flex justify-end gap-2">
                <Button
                    className="flex-1"
                    variant="outline"
                    isDisabled={isDisabled}
                    onPress={() => closeModal()}
                >
                    {TEXT.CANCEL}
                </Button>

                <Button
                    className="flex-1"
                    variant="danger"
                    onPress={onConfirm}
                    isDisabled={isDisabled}
                >
                    {TEXT.SUBMIT}
                </Button>
            </div>
        </div>
    );
}

export default ConfirmModal;
