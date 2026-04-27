import React from "react";
import ErrorMessage from "./ErrorMessage";
import { twMerge } from "tailwind-merge";
import {
    Input as InputHeroUI,
    InputGroup as InputGroupHeroUI,
    InputProps,
    InputGroupProps,
} from "@heroui/react";
import { ErrorOption } from "react-hook-form";

type TInput = InputProps & {
    errorMessage?: ErrorOption;
};

type TInputGroup = InputGroupProps & {
    errorMessage?: ErrorOption;
};

export const Input = ({
    ref,
    errorMessage,
    ...props
}: TInput & { ref?: React.Ref<HTMLInputElement> }) => {
    return (
        <>
            <InputHeroUI
                ref={ref}
                {...props}
                className={twMerge(
                    "border border-gray-300 rounded-md",
                    typeof props.className === "string" && props.className,
                )}
            />

            {errorMessage && <ErrorMessage>{errorMessage.message}</ErrorMessage>}
        </>
    );
};

const InputGroupBase = ({ errorMessage, ...props }: TInputGroup) => {
    return (
        <>
            <InputGroupHeroUI
                {...props}
                className={twMerge(
                    "border border-gray-300 rounded-md",
                    typeof props.className === "string" && props.className,
                )}
            />

            {errorMessage && <ErrorMessage>{errorMessage.message}</ErrorMessage>}
        </>
    );
};

const InputGroup = Object.assign(InputGroupBase, {
    Input: InputGroupHeroUI.Input,
    Prefix: InputGroupHeroUI.Prefix,
    Suffix: InputGroupHeroUI.Suffix,
});

export { InputGroup };
