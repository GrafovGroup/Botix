import { test } from "node:test";
import assert from "node:assert/strict";
import { previewAccess } from "../src/lib/preview-access";
import { siteEnvironment } from "../src/lib/site-environment";
import { inquiryRateKey } from "../src/lib/inquiry-rate-key";
import { deliveryReadiness } from "../src/lib/delivery-config";
import { cities } from "../src/lib/cities";
import { regions } from "../src/lib/locations";
test("preview protects missing and incorrect credentials with constant-length digest comparison", () => {
  const secret = "synthetic-preview-secret-at-least-32-chars";
  assert.equal(previewAccess("preview", "", null), "unconfigured");
  assert.equal(previewAccess("preview", secret, null), "challenge");
  assert.equal(previewAccess("preview", secret, "Basic !!!"), "challenge");
  assert.equal(
    previewAccess(
      "preview",
      secret,
      "Basic " + Buffer.from(`wrong:${secret}`).toString("base64"),
    ),
    "challenge",
  );
  assert.equal(
    previewAccess(
      "preview",
      secret,
      "Basic " + Buffer.from(`botix:${secret}`).toString("base64"),
    ),
    "allow",
  );
  assert.equal(previewAccess("production", undefined, null), "allow");
});
test("unclassified production server defaults to protected preview", () => {
  assert.equal(siteEnvironment({ NODE_ENV: "production" }), "preview");
  assert.equal(
    siteEnvironment({ NODE_ENV: "production", SITE_ENV: "development" }),
    "preview",
  );
  assert.equal(
    siteEnvironment({ NODE_ENV: "production", SITE_ENV: "production" }),
    "production",
  );
  assert.equal(siteEnvironment({ NODE_ENV: "development" }), "development");
});
test("forwarded address is ignored without explicit trusted proxy mode", () => {
  assert.equal(
    inquiryRateKey("token-a", "1.2.3.4", false),
    inquiryRateKey("token-a", "9.8.7.6", false),
  );
  assert.equal(
    inquiryRateKey("token-a", "1.2.3.4, 10.0.0.1", true),
    "ip:1.2.3.4",
  );
  assert.equal(inquiryRateKey("token-a", "malformed", true), "ip:unknown");
  assert.equal(inquiryRateKey("token-a", "::1", true), "ip:::1");
});
test("preview never enables delivery even with otherwise complete production credentials", () => {
  const env = {
    NODE_ENV: "production",
    SITE_ENV: "preview",
    SITE_URL: "https://botix.ca",
    INQUIRY_DELIVERY_ENABLED: "true",
    INQUIRY_WEBHOOK_URL: "https://receiver.invalid",
    INQUIRY_WEBHOOK_SECRET: "x".repeat(32),
    INQUIRY_SIGNING_SECRET: "y".repeat(32),
    INQUIRY_RECEIVER_VERIFIED: "true",
    INQUIRY_EDGE_RATE_LIMIT_CONFIRMED: "true",
  };
  assert.equal(deliveryReadiness(env).ready, false);
});
test("national guides retain distinct localized guidance", () => {
  assert.equal(regions.length, 13);
  assert.equal(cities.length, 16);
  for (const locale of ["en", "fr"] as const) {
    assert.equal(new Set(regions.map((r) => r.focus[locale])).size, 13);
    assert.equal(new Set(cities.map((c) => c.focus[locale])).size, 16);
  }
});
