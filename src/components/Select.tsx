import { ListBox, Select as SelectHeroUI, SelectProps } from "@heroui/react";
import ErrorMessage from "./ErrorMessage";
import { ErrorOption } from "react-hook-form";

type ISelect = SelectProps<object> & {
    errorMessage?: ErrorOption;
};

const Select = ({ errorMessage, children, ...props }: ISelect) => {
    return (
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
    );
};

Select.Item = ListBox.Item;

export { Select };
