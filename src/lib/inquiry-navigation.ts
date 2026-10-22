// Navigation carries project context only. The destination validates enums/models/dates.
export function contextHrefFromEntries(
  locale: "en" | "fr",
  entries: Iterable<[string, unknown]>,
  intent?: string,
) {
  const limits: Record<string, number> = {
    intent: 20,
    category: 30,
    product: 100,
    useCase: 600,
    startDate: 10,
    endDate: 10,
    city: 120,
    province: 2,
  };
  const query = new URLSearchParams();
  for (const [key, value] of entries)
    if (Object.hasOwn(limits, key) && typeof value === "string" && value)
      query.set(key, value.slice(0, limits[key]));
  if (intent) query.set("intent", intent);
  return `/${locale}/request-quote?${query}`;
}
