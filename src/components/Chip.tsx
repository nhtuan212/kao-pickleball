import { Chip as ChipHeroUI, ChipProps } from "@heroui/react";

export default function Chip({ children, ...props }: ChipProps) {
    return <ChipHeroUI {...props}>{children}</ChipHeroUI>;
}
