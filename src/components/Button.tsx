"use client";

import React from "react";
import clsx from "clsx";
import { Button as ButtonNextUI, ButtonProps } from "@heroui/react";
import { useDebounce } from "@/hooks";

const Button = React.forwardRef(({ ...props }: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
    //** Functions */
    const debouncedOnPress = useDebounce(props.onPress ?? (() => {}));

    //** Render */
    return (
        <ButtonNextUI
            ref={ref}
            {...props}
            className={clsx("bg-primary rounded-md", props.className)}
            onPress={debouncedOnPress}
        >
            {props.children}
        </ButtonNextUI>
    );
});

export default Button;
