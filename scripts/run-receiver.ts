// Prepared owner-controlled HTTPS endpoint; never started by the website build.
import { createServer } from "node:https";
import { readFileSync } from "node:fs";
import { createReceiver } from "../receiver/receiver";
const required = [
  "RECEIVER_TLS_KEY",
  "RECEIVER_TLS_CERT",
  "RECEIVER_OUTBOX",
  "INQUIRY_WEBHOOK_SECRET",
] as const;
for (const key of required)
  if (!process.env[key]) throw new Error(`Missing ${key}`);
const handler = createReceiver({
  directory: process.env.RECEIVER_OUTBOX!,
  secret: process.env.INQUIRY_WEBHOOK_SECRET!,
});
const server = createServer(
  {
    key: readFileSync(process.env.RECEIVER_TLS_KEY!),
    cert: readFileSync(process.env.RECEIVER_TLS_CERT!),
    maxHeaderSize: 8192,
  },
  async (req, res) => {
    try {
      if (req.url !== "/inquiry" || req.method !== "POST") {
        res.writeHead(404);
        res.end();
        return;
      }
      const chunks: Buffer[] = [];
      let size = 0;
      for await (const chunk of req) {
        size += chunk.length;
        if (size > 32768) {
          res.writeHead(413);
          res.end();
          req.destroy();
          return;
        }
        chunks.push(chunk);
      }
      const headers = new Headers();
      for (const name of ["authorization", "idempotency-key", "content-type"]) {
        const v = req.headers[name];
        if (typeof v === "string") headers.set(name, v);
      }
      const result = await handler(
        new Request("https://receiver.invalid/inquiry", {
          method: "POST",
          headers,
          body: Buffer.concat(chunks),
        }),
      );
      res.writeHead(result.status, Object.fromEntries(result.headers));
      res.end(await result.text());
    } catch {
      res.writeHead(503);
      res.end();
    }
  },
);
server.requestTimeout = 15000;
server.headersTimeout = 10000;
server.timeout = 15000;
server.maxRequestsPerSocket = 100;
server.listen(
  Number(process.env.RECEIVER_PORT || 3443),
  process.env.RECEIVER_HOST || "127.0.0.1",
  () =>
    console.log(
      "BOTIX HTTPS receiver listening; no mailbox sending is enabled.",
    ),
);
