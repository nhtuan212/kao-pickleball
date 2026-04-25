import { Checkbox as CheckboxHeroUI, CheckboxProps } from "@heroui/react";

const Checkbox = ({ children, ...props }: CheckboxProps) => {
    return (
        <CheckboxHeroUI {...props}>
            <CheckboxHeroUI.Control>
                <CheckboxHeroUI.Indicator />
            </CheckboxHeroUI.Control>
            {children as React.ReactNode}
        </CheckboxHeroUI>
    );
};

Checkbox.Content = CheckboxHeroUI.Content;

export { Checkbox };
