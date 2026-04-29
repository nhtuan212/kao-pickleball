import MatchDetail from "@/layouts/Match/Detail";
import { IMatch } from "@/types";

export default async function MatchDetailPage({
    params,
}: {
    params: Promise<{ slug: IMatch["id"] }>;
}) {
    const { slug } = await params;

    return <MatchDetail slug={slug} />;
}
