import Label from "./Label";
import { ListBox, Select as SelectHeroUI, SelectProps } from "@heroui/react";
import ErrorMessage from "./ErrorMessage";
import { IField } from "@/types";

type ISelect = SelectProps<object> & IField;

const Select = ({ label, labelClassName, errorMessage, children, ...props }: ISelect) => {
    return (
        <div>
            {label && <Label className={labelClassName}>{label}</Label>}

            <SelectHeroUI aria-label="Options" {...props}>
                <SelectHeroUI.Trigger className="border border-gray-300 rounded-lg">
                    <SelectHeroUI.Value />
                    <SelectHeroUI.Indicator />
                </SelectHeroUI.Trigger>

                <SelectHeroUI.Popover className="rounded-lg">
                    <ListBox>{children}</ListBox>
                </SelectHeroUI.Popover>

                {errorMessage && <ErrorMessage>{errorMessage.message}</ErrorMessage>}
            </SelectHeroUI>
        </div>
    );
};

Select.Item = ListBox.Item;

export { Select };
