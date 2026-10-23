import { NextRequest, NextResponse } from "next/server";
import { inquirySchema } from "@/lib/inquiry";
import {
  allowAttempt,
  deliverInquiry,
  issueToken,
  verifyToken,
} from "@/lib/inquiry-server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export function GET() {
  return NextResponse.json(
    { token: issueToken() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const allowed = process.env.SITE_URL
    ? new URL(process.env.SITE_URL).origin
    : new URL(
        `${req.nextUrl.protocol}//${req.headers.get("host") || req.nextUrl.host}`,
      ).origin;
  if (!origin || origin !== allowed)
    return NextResponse.json({ error: "origin" }, { status: 403 });
  if (!req.headers.get("content-type")?.startsWith("application/json"))
    return NextResponse.json({ error: "type" }, { status: 415 });
  const reader = req.body?.getReader();
  if (!reader) return NextResponse.json({ error: "invalid" }, { status: 400 });
  let size = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > 16384) {
      await reader.cancel();
      return NextResponse.json({ error: "size" }, { status: 413 });
    }
    chunks.push(value);
  }
  let json: unknown;
  try {
    json = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const parsed = inquirySchema.safeParse(json);
  if (!parsed.success)
    return NextResponse.json(
      {
        error: "invalid",
        fields: [...new Set(parsed.error.issues.map((i) => i.path[0]))],
      },
      { status: 400 },
    );
  if (!verifyToken(parsed.data.token))
    return NextResponse.json({ error: "token" }, { status: 400 });
  // Trust forwarded IP only when a deployment's reverse proxy overwrites it.
  const rateKey =
    process.env.TRUST_PROXY === "true"
      ? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
      : parsed.data.token;
  if (!allowAttempt(rateKey))
    return NextResponse.json(
      { error: "rate" },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  const result = await deliverInquiry(parsed.data);
  return result === "delivered"
    ? NextResponse.json({ ok: true })
    : NextResponse.json(
        { error: result },
        { status: result === "unconfigured" ? 503 : 502 },
      );
}
