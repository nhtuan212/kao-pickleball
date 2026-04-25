"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { Button as ButtonNextUI, ButtonProps } from "@heroui/react";
import { useDebounce } from "@/hooks";

const Button = ({ ref, ...props }: ButtonProps & { ref?: React.Ref<HTMLInputElement> }) => {
    //** Functions */
    const debouncedOnPress = useDebounce(props.onPress ?? (() => {}));

    //** Render */
    return (
        <ButtonNextUI
            ref={ref}
            {...props}
            className={twMerge(
                "rounded-md",
                typeof props.className === "string" && props.className,
            )}
            onPress={debouncedOnPress}
        >
            {props.children}
        </ButtonNextUI>
    );
};

export default Button;
