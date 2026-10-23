import { createHash, timingSafeEqual, randomUUID } from "node:crypto";
import { mkdir, open, link, unlink, readFile, lstat } from "node:fs/promises";
import path from "node:path";
import { inquirySchema } from "../src/lib/inquiry";
export const INQUIRY_MAILBOX = "info@botix.ca";
export const receiptText = {
  en: "Your project brief has been securely received for review.",
  fr: "Votre projet a été reçu de façon sécurisée pour examen.",
};
const response = (status: number, data: Record<string, unknown>) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
/** Private durable outbox only. No SMTP/network side effects, no payload logging. */
export function createReceiver({
  directory,
  secret,
}: {
  directory: string;
  secret: string;
}) {
  if (secret.length < 32 || !path.isAbsolute(directory))
    throw new Error(
      "Private absolute outbox path and strong receiver secret required",
    );
  return async (request: Request) => {
    if (request.method !== "POST") return response(405, { accepted: false });
    const supplied = request.headers.get("authorization") || "";
    const expected = `Bearer ${secret}`;
    if (
      Buffer.byteLength(supplied) !== Buffer.byteLength(expected) ||
      !timingSafeEqual(Buffer.from(supplied), Buffer.from(expected))
    )
      return response(401, { accepted: false });
    const key = request.headers.get("idempotency-key") || "";
    if (!/^[a-f0-9]{64}$/.test(key)) return response(400, { accepted: false });
    if (!request.headers.get("content-type")?.startsWith("application/json"))
      return response(415, { accepted: false });
    let raw: unknown;
    try {
      const reader = request.body?.getReader();
      if (!reader) return response(400, { accepted: false });
      const chunks: Uint8Array[] = [];
      let size = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.length;
        if (size > 32768) {
          await reader.cancel();
          return response(413, { accepted: false });
        }
        chunks.push(value);
      }
      raw = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    } catch {
      return response(400, { accepted: false });
    }
    if (
      !raw ||
      typeof raw !== "object" ||
      Array.isArray(raw) ||
      !("source" in raw) ||
      raw.source !== "botix.ca"
    )
      return response(422, { accepted: false });
    const parsed = inquirySchema.safeParse({
      ...raw,
      website: "",
      token: "receiver-validation-only-no-form-token",
    });
    if (!parsed.success) return response(422, { accepted: false });
    const { website, token, ...payload } = parsed.data;
    void website;
    void token;
    const digest = createHash("sha256")
      .update(JSON.stringify(payload))
      .digest("hex");
    const target = path.join(directory, key + ".json");
    const temporary = path.join(directory, ".pending-" + randomUUID());
    try {
      await mkdir(directory, { recursive: true, mode: 0o700 });
      const directoryStat = await lstat(directory);
      if (!directoryStat.isDirectory() || (directoryStat.mode & 0o077) !== 0)
        throw new Error("Private outbox required");
      const file = await open(temporary, "wx", 0o600);
      try {
        await file.writeFile(
          JSON.stringify({
            version: 1,
            digest,
            receipt: key,
            to: INQUIRY_MAILBOX,
            replyTo: payload.email,
            locale: payload.locale,
            routing: payload.intent,
            state: "pending-mailbox-delivery",
            receivedAt: new Date().toISOString(),
            payload,
          }),
        );
        await file.sync();
      } finally {
        await file.close();
      }
      try {
        await link(temporary, target);
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
        const previous = JSON.parse(await readFile(target, "utf8"));
        if (previous.digest !== digest)
          return response(409, { accepted: false });
      }
      const dir = await open(directory, "r");
      try {
        await dir.sync();
      } finally {
        await dir.close();
      }
      return response(202, {
        accepted: true,
        receipt: key,
        message: receiptText[payload.locale],
      });
    } catch {
      return response(503, { accepted: false });
    } finally {
      await unlink(temporary).catch(() => {});
    }
  };
}
