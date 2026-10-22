import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export function GET() {
  // Liveness only. No secret/configuration/receiver details and no external request.
  return NextResponse.json(
    { status: "ok", service: "botix" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
