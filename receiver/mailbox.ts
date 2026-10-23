import { createHash } from "node:crypto";
import { constants } from "node:fs";
import { lstat, mkdir, open, readFile, rename, unlink } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { inquirySchema, type Inquiry } from "../src/lib/inquiry";
import { INQUIRY_MAILBOX } from "./receiver";
import { classifyLead } from "./operations";

export type Mail = {
  to: typeof INQUIRY_MAILBOX;
  from: typeof INQUIRY_MAILBOX;
  replyTo: string;
  messageId: string;
  raw: string;
};
export type Transport = (mail: Mail) => Promise<void>;
const encoded = (s: string) => Buffer.from(s, "utf8").toString("base64");
export function notification(payload: Inquiry, receipt: string): Mail {
  if (!/^[a-f0-9]{64}$/.test(receipt)) throw new Error("Invalid receipt");
  const p = inquirySchema.parse(payload);
  if (/[\r\n]/.test(p.email)) throw new Error("Invalid reply address");
  const route = classifyLead(p);
  const subject =
    p.locale === "fr"
      ? `BOTIX — Nouvelle demande / ${route.queue}`
      : `BOTIX — New inquiry / ${route.queue}`;
  const body = [
    p.locale === "fr" ? "NOUVELLE DEMANDE BOTIX" : "NEW BOTIX INQUIRY",
    `Receipt: ${receipt}`,
    `Queue: ${route.queue}`,
    `Language: ${route.language}`,
    `Priority: ${route.priority}`,
    "Owner: unassigned. Review consent and assign an operator before follow-up.",
    "Internal response goal: 8 business hours, not a customer promise.",
    ...Object.entries(p)
      .filter(([k]) => !["token", "website"].includes(k))
      .map(([k, v]) => `${k}: ${v}`),
    "Next: assess task/site, confirm missing information and source availability. Never imply stock or supplier authorization.",
  ].join("\n");
  const messageId = `<${receipt}@botix.ca>`;
  const raw = [
    `From: BOTIX <${INQUIRY_MAILBOX}>`,
    `To: ${INQUIRY_MAILBOX}`,
    `Reply-To: ${p.email}`,
    `Message-ID: ${messageId}`,
    `Subject: =?UTF-8?B?${encoded(subject)}?=`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    encoded(body)
      .match(/.{1,76}/g)!
      .join("\r\n"),
    "",
  ].join("\r\n");
  return {
    to: INQUIRY_MAILBOX,
    from: INQUIRY_MAILBOX,
    replyTo: p.email,
    messageId,
    raw,
  };
}
async function privateDirectory(directory: string) {
  if (!path.isAbsolute(directory))
    throw new Error("Private absolute directory required");
  await mkdir(directory, { recursive: true, mode: 0o700 });
  const stat = await lstat(directory);
  if (!stat.isDirectory() || stat.mode & 0o077)
    throw new Error("Private directory required");
}
async function durableState(file: string, state: object) {
  const temporary = file + ".next";
  const f = await open(temporary, "wx", 0o600);
  try {
    await f.writeFile(JSON.stringify(state));
    await f.sync();
  } finally {
    await f.close();
  }
  await rename(temporary, file);
  const d = await open(path.dirname(file), "r");
  try {
    await d.sync();
  } finally {
    await d.close();
  }
}
/** Locks are deliberately retained after ambiguity/crash: operator reconciles mailbox before retry. */
export async function processReceipt({
  directory,
  stateDirectory,
  receipt,
  transport,
  authorized = false,
}: {
  directory: string;
  stateDirectory: string;
  receipt: string;
  transport: Transport;
  authorized?: boolean;
}) {
  if (!authorized) return "disabled" as const;
  if (!/^[a-f0-9]{64}$/.test(receipt)) throw new Error("Invalid receipt");
  await privateDirectory(directory);
  await privateDirectory(stateDirectory);
  const lock = path.join(stateDirectory, receipt + ".lock");
  let claim;
  try {
    claim = await open(lock, "wx", 0o600);
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "EEXIST")
      return "already-claimed" as const;
    throw e;
  }
  await claim.close();
  const state = path.join(stateDirectory, receipt + ".json");
  let sending = false;
  try {
    try {
      const prior = JSON.parse(await readFile(state, "utf8"));
      if (
        prior.state === "submitted-to-local-mta" ||
        prior.state === "sending" ||
        prior.state === "needs-reconciliation"
      )
        return "already-claimed" as const;
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== "ENOENT") throw e;
    }
    const f = await open(
      path.join(directory, receipt + ".json"),
      constants.O_RDONLY | constants.O_NOFOLLOW,
    );
    let record;
    try {
      const stat = await f.stat();
      if (!stat.isFile() || stat.size > 40000 || stat.mode & 0o077)
        throw new Error("Invalid spool file");
      record = JSON.parse(await f.readFile("utf8"));
    } finally {
      await f.close();
    }
    if (
      record.receipt !== receipt ||
      record.to !== INQUIRY_MAILBOX ||
      record.state !== "pending-mailbox-delivery"
    )
      throw new Error("Invalid outbox record");
    const parsed = inquirySchema.parse({
      ...record.payload,
      website: "",
      token: "private-worker-validation-token",
    });
    const { website, token, ...payload } = parsed;
    void website;
    void token;
    if (
      createHash("sha256").update(JSON.stringify(payload)).digest("hex") !==
      record.digest
    )
      throw new Error("Digest mismatch");
    const mail = notification(parsed, receipt);
    await durableState(state, {
      state: "sending",
      updatedAt: new Date().toISOString(),
    });
    sending = true;
    await transport(mail);
    await durableState(state, {
      state: "submitted-to-local-mta",
      updatedAt: new Date().toISOString(),
    });
    return "submitted-to-local-mta" as const;
  } catch {
    if (sending) {
      await durableState(state, {
        state: "needs-reconciliation",
        updatedAt: new Date().toISOString(),
      });
      return "needs-reconciliation" as const;
    }
    await unlink(lock);
    return "invalid-record" as const;
  }
}
/** Host-local sendmail; zero network requests from tests. Success means MTA acceptance, not inbox receipt. */
export function sendmailTransport(timeoutMs = 10000): Transport {
  return (mail) =>
    new Promise((resolve, reject) => {
      const child = spawn(
        "/usr/sbin/sendmail",
        ["-i", "-f", INQUIRY_MAILBOX, "--", INQUIRY_MAILBOX],
        { shell: false, stdio: ["pipe", "ignore", "ignore"] },
      );
      const timer = setTimeout(() => {
        child.kill("SIGKILL");
        reject(new Error("Mail transport outcome unknown"));
      }, timeoutMs);
      child.on("error", () => {
        clearTimeout(timer);
        reject(new Error("Mail transport failed"));
      });
      child.on("close", (code) => {
        clearTimeout(timer);
        if (code === 0) resolve();
        else reject(new Error("Mail transport failed"));
      });
      child.stdin.on("error", () => {
        clearTimeout(timer);
        reject(new Error("Mail transport failed"));
      });
      child.stdin.end(mail.raw);
    });
}
