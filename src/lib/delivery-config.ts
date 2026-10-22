type Environment = Record<string, string | undefined>;
export function deliveryReadiness(env: Environment = process.env) {
  const missing: string[] = [];
  if (env.INQUIRY_DELIVERY_ENABLED !== "true")
    missing.push("INQUIRY_DELIVERY_ENABLED");
  try {
    const url = new URL(env.INQUIRY_WEBHOOK_URL || "");
    if (url.protocol !== "https:" || url.username || url.password || url.hash)
      missing.push("INQUIRY_WEBHOOK_URL");
  } catch {
    missing.push("INQUIRY_WEBHOOK_URL");
  }
  if ((env.INQUIRY_WEBHOOK_SECRET || "").length < 32)
    missing.push("INQUIRY_WEBHOOK_SECRET");
  if ((env.INQUIRY_SIGNING_SECRET || "").length < 32)
    missing.push("INQUIRY_SIGNING_SECRET");
  if (env.NODE_ENV === "production") {
    try {
      if (new URL(env.SITE_URL || "").protocol !== "https:")
        missing.push("SITE_URL");
    } catch {
      missing.push("SITE_URL");
    }
    for (const key of [
      "INQUIRY_RECEIVER_VERIFIED",
      "INQUIRY_EDGE_RATE_LIMIT_CONFIRMED",
    ])
      if (env[key] !== "true") missing.push(key);
  }
  return { ready: missing.length === 0, missing };
}
