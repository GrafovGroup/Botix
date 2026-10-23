// Isolated synthetic receiver harness: injected transport, no network or real leads.
import assert from "node:assert/strict";
import { mkdtemp, writeFile, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { deliverInquiry, issueToken } from "../src/lib/inquiry-server";
import { inquirySchema } from "../src/lib/inquiry";
async function main() {
  Object.assign(process.env, {
    SITE_ENV: "production",
    INQUIRY_DELIVERY_ENABLED: "true",
    INQUIRY_WEBHOOK_URL: "https://receiver.invalid/inquiry",
    INQUIRY_WEBHOOK_SECRET: "synthetic-webhook-secret-32-characters",
    INQUIRY_SIGNING_SECRET: "synthetic-signing-secret-32-characters",
    INQUIRY_RECEIVER_VERIFIED: "true",
    INQUIRY_EDGE_RATE_LIMIT_CONFIRMED: "true",
    SITE_URL: "https://botix.ca",
  });
  const directory = await mkdtemp(join(tmpdir(), "botix-receiver-"));
  let accepted = 0;
  const receiver: typeof fetch = async (_url, init) => {
    assert.equal(
      new Headers(init?.headers).get("Authorization"),
      `Bearer ${process.env.INQUIRY_WEBHOOK_SECRET}`,
    );
    const key = new Headers(init?.headers).get("Idempotency-Key")!;
    assert.match(key, /^[a-f0-9]{64}$/);
    const data = JSON.parse(String(init?.body));
    assert.ok(!("token" in data) && !("website" in data));
    delete data.submittedAt;
    const digest = createHash("sha256")
      .update(JSON.stringify(data))
      .digest("hex");
    const path = join(directory, key);
    try {
      await writeFile(path, JSON.stringify({ digest, payload: data }), {
        flag: "wx",
        mode: 0o600,
      });
      accepted++;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST")
        return new Response(null, { status: 500 });
      if (JSON.parse(await readFile(path, "utf8")).digest !== digest)
        return new Response(null, { status: 409 });
    }
    return Response.json({ accepted: true, receipt: key }, { status: 202 }); // Only after persistence.
  };
  const inquiry = inquirySchema.parse({
    locale: "en",
    intent: "general",
    category: "unsure",
    company: "Synthetic fixture",
    name: "Test Person",
    email: "fixture@example.invalid",
    phone: "+14165550100",
    city: "Toronto",
    province: "ON",
    useCase: "Synthetic delivery validation",
    timeline: "exploring",
    quantity: 1,
    details: "Synthetic test only; never a real customer inquiry.",
    consent: true,
    website: "",
    token: issueToken(Date.now() - 5000),
  });
  try {
    assert.equal(await deliverInquiry(inquiry, receiver), "delivered");
    assert.equal(await deliverInquiry(inquiry, receiver), "delivered");
    assert.equal(accepted, 1);
    assert.equal(
      await deliverInquiry(
        {
          ...inquiry,
          details: "Changed synthetic payload with the same delivery key.",
        },
        receiver,
      ),
      "failed",
    );
    assert.equal(
      await deliverInquiry(
        inquiry,
        async () => new Response(null, { status: 503 }),
      ),
      "failed",
    );
    assert.equal(
      await deliverInquiry(inquiry, async () => {
        throw new Error("timeout");
      }),
      "failed",
    );
    console.log(
      "Passed: durable synthetic acceptance, deduplication, conflict, upstream failure and network failure. No external network calls.",
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}
void main();
