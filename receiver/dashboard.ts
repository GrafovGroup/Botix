import { classifyLead } from "./operations";
import { inquirySchema } from "../src/lib/inquiry";
/** Aggregate only. Never return payloads, receipt IDs, addresses or free text. */
export function queueSummary(records: unknown[], now = Date.now()) {
  const result = {
    accepted: 0,
    invalid: 0,
    olderThanOneDay: 0,
    byQueue: {} as Record<string, number>,
    byLanguage: { en: 0, fr: 0 },
  };
  for (const raw of records) {
    if (
      !raw ||
      typeof raw !== "object" ||
      !("payload" in raw) ||
      !("receivedAt" in raw)
    ) {
      result.invalid++;
      continue;
    }
    const r = raw as { payload: object; receivedAt: string };
    const parsed = inquirySchema.safeParse({
      ...r.payload,
      website: "",
      token: "internal-dashboard-validation",
    });
    const time = Date.parse(r.receivedAt);
    if (!parsed.success || !Number.isFinite(time) || time > now) {
      result.invalid++;
      continue;
    }
    const c = classifyLead(parsed.data);
    result.accepted++;
    result.byQueue[c.queue] = (result.byQueue[c.queue] || 0) + 1;
    result.byLanguage[c.language]++;
    if (now - time > 86400000) result.olderThanOneDay++;
  }
  return result;
}
