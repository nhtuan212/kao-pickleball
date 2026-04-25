import {
    Card as CardHeroUI,
    CardHeader,
    CardContent,
    CardRootProps,
    CardFooter,
} from "@heroui/react";
import { twMerge } from "tailwind-merge";

export default function Card(props: CardRootProps) {
    return (
        <CardHeroUI {...props} className={twMerge("rounded-lg", props.className)}>
            {props.children}
        </CardHeroUI>
    );
}

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export { Card };
