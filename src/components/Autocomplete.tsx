"use client";

import ErrorMessage from "./ErrorMessage";
import Label from "./Label";
import {
    Key,
    Autocomplete as AutocompleteHeroUI,
    AutocompleteProps,
    EmptyState,
    ListBox,
    SearchField,
    useFilter,
} from "@heroui/react";
import { twMerge } from "tailwind-merge";
import { TEXT } from "@/constants";
import { IField } from "@/types";

const Autocomplete = ({
    ref,
    label,
    labelClassName,
    errorMessage,
    onClearValue,

    children,
    ...props
}: AutocompleteProps<object> & IField & { onClearValue?: (key: Key | null) => void }) => {
    const { contains } = useFilter({ sensitivity: "base" });

    //** Functions */
    const handleChange = (value: Key | null) => {
        typeof props.onChange === "function" && props.onChange(value);
    };

    //** Variables */
    const currentValue = (props.value as Key | null) ?? null;

    //** Render */
    return (
        <div>
            <AutocompleteHeroUI
                ref={ref}
                {...props}
                onChange={handleChange}
                className={twMerge(
                    "border border-gray-300 rounded-md",
                    typeof props.className === "string" && props.className,
                )}
                aria-label="Autocomplete"
            >
                {label && <Label className={labelClassName}>{label}</Label>}

                <AutocompleteHeroUI.Trigger className="py-2">
                    <AutocompleteHeroUI.Value />
                    <AutocompleteHeroUI.ClearButton
                        onClick={() => {
                            typeof onClearValue === "function" && onClearValue(currentValue);
                            typeof props.onChange === "function" && props.onChange(null);
                        }}
                    />
                    <AutocompleteHeroUI.Indicator />
                </AutocompleteHeroUI.Trigger>

                <AutocompleteHeroUI.Popover>
                    <AutocompleteHeroUI.Filter filter={contains}>
                        <SearchField
                            autoFocus
                            name="search"
                            variant="secondary"
                            aria-label="Autocomplete"
                        >
                            <SearchField.Group>
                                <SearchField.SearchIcon />
                                <SearchField.Input placeholder={`${TEXT.SEARCH}...`} />
                                <SearchField.ClearButton />
                            </SearchField.Group>
                        </SearchField>

                        <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
                            {children}
                        </ListBox>
                    </AutocompleteHeroUI.Filter>
                </AutocompleteHeroUI.Popover>
            </AutocompleteHeroUI>

            {errorMessage && <ErrorMessage>{errorMessage.message}</ErrorMessage>}
        </div>
    );
};

Autocomplete.Item = ListBox.Item;

export { Autocomplete };
