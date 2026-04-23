import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export { default } from "next-auth/middleware";

export function proxy(req: NextRequest) {
    console.log({ req });
    return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
    matcher: ["/"],
};
