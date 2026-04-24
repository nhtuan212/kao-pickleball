import { ErrorMessage as ErrorMessageHeroUI, ErrorMessageProps } from "@heroui/react";

export default function ErrorMessage(props: ErrorMessageProps) {
    return <ErrorMessageHeroUI {...props}>{props.children}</ErrorMessageHeroUI>;
}
