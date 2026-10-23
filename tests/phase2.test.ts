import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { createReceiver, INQUIRY_MAILBOX } from "../receiver/receiver";
import { comparisonProducts } from "../src/lib/catalog-comparison";
import { navigationQuery } from "../src/lib/navigation-query";
import { deliverInquiry, issueToken } from "../src/lib/inquiry-server";
import { inquirySchema } from "../src/lib/inquiry";
const fixture = {
  locale: "fr",
  intent: "general",
  category: "unsure",
  company: "Synthetic Test",
  name: "Test Person",
  email: "test@example.invalid",
  phone: "+14165550100",
  city: "Montréal",
  province: "QC",
  useCase: "Synthetic task for testing",
  timeline: "exploring",
  quantity: 1,
  details: "Synthetic record, no real customer data.",
  consent: true,
  website: "",
  token: "synthetic-fixture-form-token",
};
test("comparison rejects unknowns, deduplicates and caps selections", () => {
  assert.equal(
    comparisonProducts(["unitree-g1", "unitree-g1", "invented"]).length,
    1,
  );
  assert.ok(
    comparisonProducts(["unitree-g1", "pudu-cc1", "mir250", "unitree-g1"])
      .length <= 3,
  );
  assert.equal(comparisonProducts("../private").length, 0);
});
test("language navigation retains catalogue context but strips contact fields", () => {
  const q = navigationQuery(
    "/fr/robots",
    new URLSearchParams(
      "query=nettoyage&compare=unitree-g1&compare=pudu-cc1&email=private@example.invalid&phone=123&details=private",
    ).entries(),
  );
  assert.equal(new URLSearchParams(q).getAll("compare").length, 2);
  assert.ok(q.includes("query=nettoyage"));
  assert.ok(!q.includes("private") && !q.includes("phone"));
  assert.equal(
    navigationQuery(
      "/en/about",
      new URLSearchParams("email=private").entries(),
    ),
    "",
  );
});
test("receiver persists once across concurrent requests/restart, rejects conflicts and invalid input", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "botix-phase2-"));
  const secret = "synthetic-secret-at-least-32-characters";
  const key = "a".repeat(64);
  const request = (
    body: unknown = { ...fixture, source: "botix.ca" },
    auth = secret,
    id = key,
  ) =>
    new Request("https://receiver.invalid/inquiry", {
      method: "POST",
      headers: {
        authorization: `Bearer ${auth}`,
        "idempotency-key": id,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
  try {
    const receiver = createReceiver({ directory, secret });
    const replies = await Promise.all([
      receiver(request()),
      receiver(request()),
    ]);
    assert.deepEqual(
      replies.map((r) => r.status),
      [202, 202],
    );
    assert.equal(
      (await createReceiver({ directory, secret })(request())).status,
      202,
    );
    assert.equal((await readdir(directory)).length, 1);
    const record = JSON.parse(
      await readFile(path.join(directory, key + ".json"), "utf8"),
    );
    assert.equal(record.to, INQUIRY_MAILBOX);
    assert.equal(record.to, "info@botix.ca");
    assert.equal(record.replyTo, fixture.email);
    assert.equal(record.locale, "fr");
    assert.equal(record.state, "pending-mailbox-delivery");
    assert.equal(
      (
        await receiver(
          request({
            ...fixture,
            source: "botix.ca",
            details: "Different synthetic project information.",
          }),
        )
      ).status,
      409,
    );
    assert.equal(
      (
        await receiver(
          request(
            { ...fixture, source: "botix.ca", consent: false },
            secret,
            "b".repeat(64),
          ),
        )
      ).status,
      422,
    );
    assert.equal((await receiver(request(undefined, "wrong"))).status, 401);
    assert.equal(
      (await receiver(request(undefined, secret, "../escape"))).status,
      400,
    );
    assert.equal(
      (
        await receiver(
          request({ source: "botix.ca", details: "x".repeat(40000) }),
        )
      ).status,
      413,
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
test("adapter retries an ambiguous durable acceptance without duplicate and requires matching receipt", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "botix-retry-"));
  const previous = { ...process.env };
  Object.assign(process.env, {
    SITE_ENV: "production",
    SITE_URL: "https://botix.ca",
    INQUIRY_DELIVERY_ENABLED: "true",
    INQUIRY_RECEIVER_VERIFIED: "true",
    INQUIRY_EDGE_RATE_LIMIT_CONFIRMED: "true",
    INQUIRY_WEBHOOK_URL: "https://receiver.invalid/inquiry",
    INQUIRY_WEBHOOK_SECRET: "synthetic-secret-at-least-32-characters",
    INQUIRY_SIGNING_SECRET: "synthetic-signing-at-least-32-characters",
  });
  try {
    const receiver = createReceiver({
      directory,
      secret: process.env.INQUIRY_WEBHOOK_SECRET!,
    });
    let calls = 0;
    const sender: typeof fetch = async (url, init) => {
      calls++;
      const r = await receiver(new Request(url, init));
      if (calls === 1)
        throw new Error("synthetic lost response after persistence");
      return r;
    };
    const inquiry = inquirySchema.parse({
      ...fixture,
      token: issueToken(Date.now() - 5000),
    });
    assert.equal(await deliverInquiry(inquiry, sender), "delivered");
    assert.equal(calls, 2);
    assert.equal((await readdir(directory)).length, 1);
    assert.equal(
      await deliverInquiry(inquiry, async () =>
        Response.json({ accepted: true, receipt: "wrong" }, { status: 202 }),
      ),
      "failed",
    );
    assert.equal(
      await deliverInquiry(
        inquiry,
        async () => new Response(null, { status: 200 }),
      ),
      "failed",
    );
    process.env.INQUIRY_DELIVERY_ENABLED = "false";
    assert.equal(
      await deliverInquiry(inquiry, () => {
        throw new Error("must not call");
      }),
      "unconfigured",
    );
  } finally {
    for (const k of Object.keys(process.env))
      if (!(k in previous)) delete process.env[k];
    Object.assign(process.env, previous);
    await rm(directory, { recursive: true, force: true });
  }
});

test("receiver refuses unavailable storage and returns localized durable receipts", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "botix-storage-"));
  const secret = "synthetic-secret-at-least-32-characters";
  const request = (locale: string, key: string) =>
    new Request("https://receiver.invalid/inquiry", {
      method: "POST",
      headers: {
        authorization: `Bearer ${secret}`,
        "idempotency-key": key.repeat(64),
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...fixture, source: "botix.ca", locale }),
    });
  try {
    const receiver = createReceiver({ directory, secret });
    const en = await receiver(request("en", "c"));
    assert.match((await en.json()).message, /securely received/);
    const fr = await receiver(request("fr", "d"));
    assert.match((await fr.json()).message, /reçu/);
    const blocked = createReceiver({
      directory: path.join(directory, "c".repeat(64) + ".json", "outbox"),
      secret,
    });
    assert.equal((await blocked(request("en", "e"))).status, 503);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
