import { test } from "node:test";
import assert from "node:assert/strict";
import { inquirySchema } from "../src/lib/inquiry";
import {
  issueToken,
  verifyToken,
  allowAttempt,
  deliverInquiry,
} from "../src/lib/inquiry-server";
const valid = {
  locale: "fr",
  intent: "pilot",
  category: "humanoid",
  useCase: "Supervised handling research",
  product: "unitree-g1",
  company: "Test Company",
  name: "Test Person",
  email: "person@example.com",
  phone: "+1 416 555 1234",
  city: "Toronto",
  province: "ON",
  timeline: "3-6",
  quantity: "2",
  budget: "",
  details: "Evaluate a supervised handling task in our lab.",
  consent: true,
  website: "",
  token: issueToken(Date.now() - 5000),
};
test("valid bilingual inquiry coerces quantity and retains consent", () => {
  const parsed = inquirySchema.parse(valid);
  assert.equal(parsed.quantity, 2);
  assert.equal(parsed.locale, "fr");
});
test("invalid input, unsupported region, spam and missing consent are rejected", () => {
  for (const change of [
    { email: "bad" },
    { quantity: 0 },
    { quantity: 1.5 },
    { province: "XX" },
    { consent: false },
    { website: "spam" },
    { details: "short" },
    { phone: "<script>" },
    { locale: "de" },
    { details: "x".repeat(4001) },
  ])
    assert.equal(
      inquirySchema.safeParse({ ...valid, ...change }).success,
      false,
    );
});
test("signed tokens reject tampering, expiry and instant submission", () => {
  const now = Date.now();
  assert.equal(verifyToken(issueToken(now - 5000), now), true);
  assert.equal(verifyToken(issueToken(now), now), false);
  assert.equal(verifyToken(issueToken(now - 7200001), now), false);
  assert.equal(verifyToken(issueToken(now - 5000) + "a", now), false);
  assert.equal(verifyToken("bad", now), false);
});
test("rate limiter blocks sixth attempt and permits after window", () => {
  const now = Date.now();
  for (let i = 0; i < 5; i++) assert.equal(allowAttempt("test", now), true);
  assert.equal(allowAttempt("test", now), false);
  assert.equal(allowAttempt("test", now + 600001), true);
});
test("delivery never reports success without configuration or upstream acceptance", async () => {
  const savedEnv = { ...process.env };
  Object.assign(process.env, {
    SITE_ENV: "production",
    INQUIRY_DELIVERY_ENABLED: "true",
    INQUIRY_SIGNING_SECRET: "test-signing-secret-32-characters-long",
    INQUIRY_RECEIVER_VERIFIED: "true",
    INQUIRY_EDGE_RATE_LIMIT_CONFIRMED: "true",
    SITE_URL: "https://botix.ca",
  });
  const previous = {
    url: process.env.INQUIRY_WEBHOOK_URL,
    key: process.env.INQUIRY_WEBHOOK_SECRET,
  };
  try {
    delete process.env.INQUIRY_WEBHOOK_URL;
    delete process.env.INQUIRY_WEBHOOK_SECRET;
    const inquiry = inquirySchema.parse(valid);
    assert.equal(await deliverInquiry(inquiry), "unconfigured");
    process.env.INQUIRY_WEBHOOK_URL = "https://example.com/inquiries";
    process.env.INQUIRY_WEBHOOK_SECRET =
      "test-webhook-secret-32-characters-long";
    let calls = 0;
    const accepted: typeof fetch = async (_url, init) => {
      calls++;
      const payload = JSON.parse(String(init?.body));
      assert.equal("token" in payload, false);
      assert.equal("website" in payload, false);
      assert.equal(payload.locale, "fr");
      assert.ok(new Headers(init?.headers).get("Idempotency-Key"));
      return Response.json(
        {
          accepted: true,
          receipt: new Headers(init?.headers).get("Idempotency-Key"),
        },
        { status: 202 },
      );
    };
    assert.equal(await deliverInquiry(inquiry, accepted), "delivered");
    assert.equal(calls, 1);
    assert.equal(
      await deliverInquiry(
        inquiry,
        async () => new Response("", { status: 500 }),
      ),
      "failed",
    );
    assert.equal(
      await deliverInquiry(inquiry, async () => {
        throw new Error("offline");
      }),
      "failed",
    );
    process.env.INQUIRY_WEBHOOK_URL = "http://example.com";
    assert.equal(await deliverInquiry(inquiry, accepted), "unconfigured");
  } finally {
    for (const key of [
      "SITE_ENV",
      "INQUIRY_DELIVERY_ENABLED",
      "INQUIRY_SIGNING_SECRET",
      "INQUIRY_RECEIVER_VERIFIED",
      "INQUIRY_EDGE_RATE_LIMIT_CONFIRMED",
      "SITE_URL",
    ]) {
      if (savedEnv[key] === undefined) delete process.env[key];
      else process.env[key] = savedEnv[key];
    }
    if (previous.url) process.env.INQUIRY_WEBHOOK_URL = previous.url;
    else delete process.env.INQUIRY_WEBHOOK_URL;
    if (previous.key) process.env.INQUIRY_WEBHOOK_SECRET = previous.key;
    else delete process.env.INQUIRY_WEBHOOK_SECRET;
  }
});

test("rental dates must be complete, real and ordered", () => {
  const rental = {
    ...valid,
    intent: "rental",
    startDate: "2026-12-01",
    endDate: "2026-12-02",
  };
  assert.equal(inquirySchema.safeParse(rental).success, true);
  for (const change of [
    { startDate: "" },
    { endDate: "" },
    { endDate: "2026-11-30" },
    { startDate: "2026-02-30" },
    { startDate: "bad" },
  ])
    assert.equal(
      inquirySchema.safeParse({ ...rental, ...change }).success,
      false,
    );
});
test("server rejects unknown products, category mismatches and unsupported inquiry modes", () => {
  for (const change of [
    { product: "invented" },
    { category: "cleaning" },
    { intent: "service" },
    { useCase: "short" },
    { product: "mir250", category: "logistics", intent: "rental" },
  ])
    assert.equal(
      inquirySchema.safeParse({ ...valid, ...change }).success,
      false,
    );
  assert.equal(
    inquirySchema.safeParse({ ...valid, intent: "general", product: "" })
      .success,
    true,
  );
  assert.equal(
    inquirySchema.safeParse({ ...valid, intent: "integration" }).success,
    true,
  );
});
