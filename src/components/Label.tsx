import { Label as LabelHeroUI, LabelProps } from "@heroui/react";

export default function Label({ children, ...props }: LabelProps) {
    return <LabelHeroUI {...props}>{children}</LabelHeroUI>;
}
