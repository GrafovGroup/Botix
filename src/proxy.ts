import { siteEnvironment } from "./lib/site-environment";
import { NextResponse, type NextRequest } from "next/server";
import { previewAccess } from "./lib/preview-access";
export function proxy(req: NextRequest) {
  const environment = siteEnvironment();
  const preview = environment === "preview";
  const access = previewAccess(
    environment,
    process.env.PREVIEW_ACCESS_SECRET,
    req.headers.get("authorization"),
  );
  let response: NextResponse;
  if (access === "unconfigured")
    response = new NextResponse("Service unavailable", { status: 503 });
  else if (access === "challenge")
    response = new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="BOTIX preview", charset="UTF-8"',
      },
    });
  else
    response =
      req.nextUrl.pathname === "/"
        ? NextResponse.redirect(new URL("/en", req.url))
        : NextResponse.next();
  if (preview) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    response.headers.set("Cache-Control", "private, no-store");
  }
  return response;
}
// Protect HTML, API, RSC and assets alike; browser Basic credentials cover same-origin resources.
export const config = { matcher: ["/:path*"] };
