import { NextResponse, type NextRequest } from "next/server";
export function proxy(req: NextRequest) {
  if (req.nextUrl.pathname === "/")
    return NextResponse.redirect(new URL("/en", req.url));
  return NextResponse.next();
}
export const config = { matcher: ["/"] };
