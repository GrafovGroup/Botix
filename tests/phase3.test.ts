import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, readdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { createReceiver } from "../receiver/receiver";
import { notification, processReceipt, type Mail } from "../receiver/mailbox";
import { classifyLead, mayFollowUp } from "../receiver/operations";
import { inquirySchema } from "../src/lib/inquiry";
const fixture = inquirySchema.parse({
  locale: "fr",
  intent: "general",
  category: "unsure",
  company: "Synthetic Company",
  name: "Synthetic Person",
  email: "test@example.invalid",
  phone: "+14165550100",
  city: "Montréal",
  province: "QC",
  useCase: "Évaluer une tâche synthétique",
  timeline: "exploring",
  quantity: 3,
  details: "Essai synthétique sans renseignements réels.",
  consent: true,
  website: "",
  token: "synthetic-token-at-least-twenty",
});
const key = "d".repeat(64),
  secret = "synthetic-secret-at-least-32-characters";
async function setup() {
  const root = await mkdtemp(path.join(tmpdir(), "botix-mailbox-"));
  const directory = path.join(root, "queue"),
    stateDirectory = path.join(root, "state");
  const receiver = createReceiver({ directory, secret });
  const r = await receiver(
    new Request("https://receiver.invalid/inquiry", {
      method: "POST",
      headers: {
        authorization: `Bearer ${secret}`,
        "idempotency-key": key,
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...fixture, source: "botix.ca" }),
    }),
  );
  assert.equal(r.status, 202);
  return { root, directory, stateDirectory, receipt: key };
}
test("all inquiry paths classify internally without inventing assignment or qualification", () => {
  for (const intent of [
    "purchase",
    "rental",
    "pilot",
    "integration",
    "service",
    "general",
  ] as const) {
    const r = classifyLead({ ...fixture, intent, category: "humanoid" });
    assert.equal(r.owner, "unassigned");
    assert.equal(r.qualification, "unreviewed");
    assert.equal(r.language, "fr");
  }
  assert.equal(
    classifyLead({ ...fixture, intent: "rental" }).queue,
    "rentals-events",
  );
  assert.equal(
    classifyLead({ ...fixture, category: "cleaning" }).queue,
    "facility-cleaning",
  );
  assert.equal(mayFollowUp("do-not-contact", true), false);
  assert.equal(mayFollowUp("new", false), false);
});
test("notification restricts recipient, encodes French and preserves quantity without form token", () => {
  const mail = notification(fixture, key);
  assert.equal(mail.to, "info@botix.ca");
  assert.equal(mail.replyTo, "test@example.invalid");
  const body = Buffer.from(
    mail.raw.split("\r\n\r\n")[1].replace(/\s/g, ""),
    "base64",
  ).toString("utf8");
  assert.ok(body.includes("Montréal"));
  assert.ok(body.includes("quantity: 3"));
  assert.ok(!body.includes(fixture.token));
  assert.throws(() =>
    notification(
      { ...fixture, email: "x@example.invalid\r\nBcc: wrong@example.invalid" },
      key,
    ),
  );
});
test("worker is disabled by default and concurrently submits exactly once", async () => {
  const s = await setup();
  let sends = 0;
  const transport = async (mail: Mail) => {
    sends++;
    assert.equal(mail.to, "info@botix.ca");
  };
  try {
    assert.equal(await processReceipt({ ...s, transport }), "disabled");
    assert.equal(sends, 0);
    const results = await Promise.all(
      Array.from({ length: 3 }, () =>
        processReceipt({ ...s, transport, authorized: true }),
      ),
    );
    assert.equal(
      results.filter((x) => x === "submitted-to-local-mta").length,
      1,
    );
    assert.equal(sends, 1);
    assert.equal(
      await processReceipt({ ...s, transport, authorized: true }),
      "already-claimed",
    );
  } finally {
    await rm(s.root, { recursive: true, force: true });
  }
});
test("ambiguous transport errors stay quarantined and never retry automatically", async () => {
  const s = await setup();
  let sends = 0;
  try {
    const transport = async () => {
      sends++;
      throw new Error("synthetic timeout");
    };
    assert.equal(
      await processReceipt({ ...s, transport, authorized: true }),
      "needs-reconciliation",
    );
    assert.equal(
      await processReceipt({ ...s, transport, authorized: true }),
      "already-claimed",
    );
    assert.equal(sends, 1);
    const status = JSON.parse(
      await readFile(path.join(s.stateDirectory, key + ".json"), "utf8"),
    );
    assert.equal(status.state, "needs-reconciliation");
  } finally {
    await rm(s.root, { recursive: true, force: true });
  }
});
test("invalid receipt and corrupted spool fail without transport", async () => {
  const s = await setup();
  let sends = 0;
  try {
    const transport = async () => {
      sends++;
    };
    await assert.rejects(
      processReceipt({
        ...s,
        receipt: "../escape",
        transport,
        authorized: true,
      }),
    );
    const { writeFile } = await import("node:fs/promises");
    await writeFile(path.join(s.directory, key + ".json"), "{}");
    assert.equal(
      await processReceipt({ ...s, transport, authorized: true }),
      "invalid-record",
    );
    assert.equal(sends, 0);
    assert.equal((await readdir(s.stateDirectory)).length, 0);
  } finally {
    await rm(s.root, { recursive: true, force: true });
  }
});
import { queueSummary } from "../receiver/dashboard";
import { buildBrief } from "../src/lib/inquiry-brief";
test("dashboard contains aggregate fields only and ignores malformed records", () => {
  const now = Date.now();
  const r = queueSummary(
    [
      { payload: fixture, receivedAt: new Date(now - 90000000).toISOString() },
      {},
    ],
    now,
  );
  assert.equal(r.accepted, 1);
  assert.equal(r.invalid, 1);
  assert.equal(r.olderThanOneDay, 1);
  assert.ok(!JSON.stringify(r).includes(fixture.email));
  assert.ok(!JSON.stringify(r).includes(fixture.name));
});
test("saved customer brief keeps numeric quantity", () => {
  assert.ok(
    buildBrief({ ...fixture, quantity: 3 }, "en").includes(
      "Estimated quantity: 3",
    ),
  );
});
