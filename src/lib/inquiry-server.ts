import { deliveryReadiness } from "./delivery-config";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import type { Inquiry } from "./inquiry";
const secret =
  process.env.INQUIRY_SIGNING_SECRET || randomBytes(32).toString("hex");
export function issueToken(now = Date.now()) {
  const payload = `${now}.${randomBytes(16).toString("hex")}`;
  return `${payload}.${createHmac("sha256", secret).update(payload).digest("hex")}`;
}
export function verifyToken(token: string, now = Date.now()) {
  const [time, nonce, signature, ...extra] = token.split(".");
  if (
    extra.length ||
    !/^\d+$/.test(time || "") ||
    !/^[a-f0-9]{32}$/.test(nonce || "") ||
    !/^[a-f0-9]{64}$/.test(signature || "")
  )
    return false;
  const expected = createHmac("sha256", secret)
    .update(`${time}.${nonce}`)
    .digest();
  const age = now - Number(time);
  return (
    age >= 2000 &&
    age <= 7200000 &&
    timingSafeEqual(expected, Buffer.from(signature, "hex"))
  );
}
const attempts = new Map<string, { count: number; until: number }>();
export function allowAttempt(key: string, now = Date.now()) {
  for (const [k, v] of attempts) if (v.until < now) attempts.delete(k);
  const current = attempts.get(key);
  if (current && current.count >= 5) return false;
  if (!current && attempts.size >= 10000) return false;
  attempts.set(key, {
    count: (current?.count || 0) + 1,
    until: current?.until || now + 600000,
  });
  return true;
}
export async function deliverInquiry(
  inquiry: Inquiry,
  sender: typeof fetch = fetch,
) {
  if (!deliveryReadiness().ready) return "unconfigured" as const;
  const endpoint = process.env.INQUIRY_WEBHOOK_URL;
  const key = process.env.INQUIRY_WEBHOOK_SECRET;
  if (!endpoint || !key) return "unconfigured" as const;
  let url: URL;
  try {
    url = new URL(endpoint);
  } catch {
    return "unconfigured" as const;
  }
  if (url.protocol !== "https:") return "unconfigured" as const;
  const { website, token, ...payload } = inquiry;
  void website;
  try {
    const response = await sender(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
        "Idempotency-Key": createHmac("sha256", secret)
          .update(token)
          .digest("hex"),
      },
      body: JSON.stringify({
        source: "botix.ca",
        submittedAt: new Date().toISOString(),
        ...payload,
      }),
      signal: AbortSignal.timeout(10000),
      redirect: "error",
    });
    return response.ok ? ("delivered" as const) : ("failed" as const);
  } catch {
    return "failed" as const;
  }
}
