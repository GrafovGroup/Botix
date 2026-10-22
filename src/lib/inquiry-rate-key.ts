import { isIP } from "node:net";
export function inquiryRateKey(
  token: string,
  forwarded: string | null,
  trustProxy: boolean,
) {
  if (!trustProxy) return `token:${token}`;
  const candidate = forwarded?.split(",")[0]?.trim() || "";
  return isIP(candidate) ? `ip:${candidate}` : "ip:unknown";
}
