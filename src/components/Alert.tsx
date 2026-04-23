import { Alert as AlertHeroUI, AlertProps } from "@heroui/react";

const Alert = ({ ...props }: AlertProps) => {
    return (
        <AlertHeroUI status="success" {...props}>
            {/* Icon match with status props */}
            <AlertHeroUI.Indicator />
            <AlertHeroUI.Content>{props.children}</AlertHeroUI.Content>
        </AlertHeroUI>
    );
};

Alert.Title = AlertHeroUI.Title;
Alert.Description = AlertHeroUI.Description;

export { Alert };
