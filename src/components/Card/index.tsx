import { Card as CardHeroUI, CardHeader, CardContent, CardRootProps } from "@heroui/react";

export default function Card(props: CardRootProps) {
    return <CardHeroUI {...props}>{props.children}</CardHeroUI>;
}

Card.Header = CardHeader;
Card.Content = CardContent;

export { Card };
