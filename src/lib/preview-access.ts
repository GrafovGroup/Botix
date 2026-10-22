import { createHash, timingSafeEqual } from "node:crypto";
export function previewAccess(
  environment: string | undefined,
  secret: string | undefined,
  authorization: string | null,
): "allow" | "challenge" | "unconfigured" {
  if (environment !== "preview") return "allow";
  if (!secret || secret.length < 32) return "unconfigured";
  if (!authorization?.startsWith("Basic ") || authorization.length > 4096)
    return "challenge";
  const supplied = Buffer.from(authorization.slice(6), "base64").toString(
    "utf8",
  );
  const hash = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(hash(supplied), hash(`botix:${secret}`))
    ? "allow"
    : "challenge";
}
