import { contextHrefFromEntries } from "../src/lib/inquiry-navigation";
import { buildBrief } from "../src/lib/inquiry-brief";
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  resolveInquiryContext,
  inquiryHref,
  pageInquiryContext,
} from "../src/lib/inquiry-context";
import { verifiedPhone } from "../src/lib/contact";
import { analyticsPayload } from "../src/lib/analytics";
import { deliveryReadiness } from "../src/lib/delivery-config";
import { products, manufacturers, validateCatalog } from "../src/lib/catalog";
test("quote workflows preserve dates, location and use case while removing incompatible products", () => {
  const context = resolveInquiryContext({
    intent: "rental",
    product: "unitree-g1",
    startDate: "2026-12-01",
    endDate: "2026-12-03",
    city: "Montréal",
    province: "QC",
    useCase: "Supervised demonstration",
    email: "secret@example.com",
  });
  for (const locale of ["en", "fr"] as const) {
    const url = new URL(
      inquiryHref(locale, context, "pilot"),
      "https://botix.ca",
    );
    assert.equal(url.pathname, `/${locale}/request-quote`);
    assert.equal(url.searchParams.get("product"), "unitree-g1");
    assert.equal(url.searchParams.get("startDate"), "2026-12-01");
    assert.equal(url.searchParams.get("endDate"), "2026-12-03");
    assert.equal(url.searchParams.get("city"), "Montréal");
    assert.equal(url.searchParams.get("province"), "QC");
    assert.equal(url.searchParams.get("useCase"), "Supervised demonstration");
    assert.equal(url.searchParams.has("email"), false);
  }
  assert.equal(
    new URL(
      inquiryHref("en", context, "general"),
      "https://botix.ca",
    ).searchParams.has("product"),
    false,
  );
  assert.equal(
    resolveInquiryContext({ startDate: "2026-02-30", province: "XX" })
      .startDate,
    "",
  );
  assert.deepEqual(pageInquiryContext("humanoid-robots"), {
    intent: "pilot",
    category: "humanoid",
  });
  assert.equal(pageInquiryContext("robot-rentals/events").intent, "rental");
  assert.equal(
    pageInquiryContext("commercial-robots/cleaning").category,
    "cleaning",
  );
});
test("phone requires owner verification and valid E.164, including structured data", () => {
  assert.equal(verifiedPhone("false", "+18336969996"), null);
  assert.equal(verifiedPhone("true", "bad"), null);
  assert.equal(verifiedPhone("true", "+18336969996")?.href, "tel:+18336969996");
});
test("analytics is opt-in and permits only event and locale", () => {
  assert.equal(analyticsPayload(false, "quote_submitted", "en"), null);
  assert.equal(analyticsPayload(true, "secret@example.com", "en"), null);
  assert.equal(analyticsPayload(true, "quote_submitted", "invalid"), null);
  assert.deepEqual(analyticsPayload(true, "quote_submitted", "fr"), {
    event: "quote_submitted",
    locale: "fr",
  });
});
test("production delivery fails closed for every missing operational gate", () => {
  const env = {
    NODE_ENV: "production",
    SITE_ENV: "production",
    INQUIRY_DELIVERY_ENABLED: "true",
    INQUIRY_WEBHOOK_URL: "https://example.com/inquiry",
    INQUIRY_WEBHOOK_SECRET: "w".repeat(32),
    INQUIRY_SIGNING_SECRET: "s".repeat(32),
    SITE_URL: "https://botix.ca",
    INQUIRY_RECEIVER_VERIFIED: "true",
    INQUIRY_EDGE_RATE_LIMIT_CONFIRMED: "true",
  };
  assert.equal(deliveryReadiness(env).ready, true);
  for (const key of Object.keys(env).filter((key) => key !== "NODE_ENV"))
    assert.equal(deliveryReadiness({ ...env, [key]: "" }).ready, false, key);
  for (const url of [
    "http://example.com",
    "https://user:pass@example.com",
    "not-a-url",
  ])
    assert.equal(
      deliveryReadiness({ ...env, INQUIRY_WEBHOOK_URL: url }).ready,
      false,
    );
});
test("catalogue rejects future review dates and unapproved supplier relationships", () => {
  assert.ok(
    validateCatalog([
      {
        ...products[0],
        evidence: { ...products[0].evidence, checkedOn: "2999-01-01" },
      },
    ]).length,
  );
  assert.ok(
    validateCatalog(products, [
      {
        ...manufacturers[0],
        relationship: {
          status: "verified",
          description: { en: "Claim", fr: "Affirmation" },
          evidence: {
            ...manufacturers[0].evidence,
            approvedForPublication: false,
          },
        },
      },
      ...manufacturers.slice(1),
    ]).length,
  );
});

test("local brief is localized and omits hidden tokens and arbitrary fields", () => {
  const text = buildBrief(
    {
      intent: "rental",
      province: "QC",
      product: "unitree-g1",
      email: "synthetic@example.invalid",
      token: "secret-token",
      website: "honeypot-value",
      arbitrary: "unexpected-value",
    },
    "fr",
  );
  assert.ok(text.includes("Location / événement"));
  assert.ok(text.includes("Québec"));
  assert.ok(text.includes("Unitree G1"));
  assert.ok(text.includes("non transmis"));
  assert.ok(
    !text.includes("secret-token") &&
      !text.includes("honeypot-value") &&
      !text.includes("unexpected-value"),
  );
});

test("rental pilot and industry CTAs use the actual journey intent", () => {
  assert.equal(
    pageInquiryContext("robot-rentals/short-term-pilots", "fr").intent,
    "pilot",
  );
  assert.equal(pageInquiryContext("industries/research", "fr").intent, "pilot");
  assert.equal(pageInquiryContext("industries/events", "fr").intent, "rental");
  assert.ok(pageInquiryContext("industries/research", "fr").useCase);
});

test("live navigation preserves edited context but excludes contact fields and challenges", () => {
  const href = contextHrefFromEntries(
    "fr",
    Object.entries({
      intent: "rental",
      product: "unitree-g1",
      useCase: "Updated task",
      startDate: "2026-12-10",
      endDate: "2026-12-12",
      city: "Montréal",
      email: "private@example.invalid",
      name: "Private Name",
      phone: "private-phone",
      company: "Private company",
      token: "private-token",
    }),
    "pilot",
  );
  const params = new URL(href, "https://botix.ca").searchParams;
  assert.equal(params.get("intent"), "pilot");
  assert.equal(params.get("startDate"), "2026-12-10");
  assert.equal(params.get("useCase"), "Updated task");
  assert.ok(!href.includes("private") && !href.includes("Private"));
});
