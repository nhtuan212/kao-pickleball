import React from "react";
import clsx from "clsx";
import { Input as InputHeroUI, InputProps } from "@heroui/react";

export const Input = React.forwardRef(
    ({ ...props }: InputProps, ref: React.Ref<HTMLInputElement>) => (
        <InputHeroUI
            ref={ref}
            {...props}
            className={clsx("border border-gray-300 rounded-md", props.className)}
        />
    ),
);
