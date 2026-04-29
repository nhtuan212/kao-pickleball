import React from "react";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";
import { twMerge } from "tailwind-merge";
import {
    Input as InputHeroUI,
    InputGroup as InputGroupHeroUI,
    InputProps,
    InputGroupProps,
    TextArea as TextAreaHeroUI,
    TextAreaProps,
} from "@heroui/react";
import { IField } from "@/types";

type TInput = InputProps & IField;

type TTextArea = TextAreaProps & IField;

type TInputGroup = InputGroupProps & IField;

export const Input = ({
    ref,
    label,
    labelClassName,
    errorMessage,
    ...props
}: TInput & { ref?: React.Ref<HTMLInputElement> }) => {
    return (
        <div className="flex flex-col gap-0.75">
            {label && <Label className={labelClassName}>{label}</Label>}

            <InputHeroUI
                ref={ref}
                {...props}
                className={twMerge(
                    "border border-gray-300 rounded-md",
                    typeof props.className === "string" && props.className,
                )}
            />

            {errorMessage && <ErrorMessage>{errorMessage.message}</ErrorMessage>}
        </div>
    );
};

export const Textarea = ({
    ref,
    label,
    labelClassName,
    errorMessage,
    ...props
}: TTextArea & { ref?: React.Ref<HTMLTextAreaElement> }) => {
    return (
        <div>
            {label && <Label className={labelClassName}>{label}</Label>}

            <TextAreaHeroUI
                ref={ref}
                rows={3}
                {...props}
                className={twMerge(
                    "border border-gray-300 rounded-md",
                    typeof props.className === "string" && props.className,
                )}
            />

            {errorMessage && <ErrorMessage>{errorMessage.message}</ErrorMessage>}
        </div>
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
