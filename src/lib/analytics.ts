export const analyticsEvents = [
  "quote_opened",
  "quote_submitted",
  "quote_confirmed",
  "quote_failed",
  "category_opened",
] as const;
export type AnalyticsEvent = (typeof analyticsEvents)[number];
// Exact allowlist: never accept URLs, field values, IDs or arbitrary properties.
export function analyticsPayload(
  consent: boolean,
  event: string,
  locale: string,
) {
  return consent === true &&
    analyticsEvents.some((e) => e === event) &&
    (locale === "en" || locale === "fr")
    ? { event, locale }
    : null;
}
export function track(
  consent: boolean,
  event: AnalyticsEvent,
  locale: "en" | "fr",
) {
  const detail = analyticsPayload(consent, event, locale);
  if (detail && typeof window !== "undefined")
    window.dispatchEvent(new CustomEvent("botix:analytics", { detail }));
}
