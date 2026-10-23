// Preserve navigation context, never arbitrary contact fields in language links.
export function navigationQuery(
  path: string,
  entries: Iterable<[string, string]>,
) {
  const allowed = path.endsWith("/robots")
    ? ["query", "type", "application", "industry", "intent", "sort", "compare"]
    : path.endsWith("/manufacturers")
      ? ["query", "type"]
      : path.endsWith("/request-quote")
        ? [
            "intent",
            "category",
            "product",
            "startDate",
            "endDate",
            "city",
            "province",
            "useCase",
          ]
        : [];
  const out = new URLSearchParams();
  for (const [key, value] of entries)
    if (
      allowed.includes(key) &&
      value.length <= (key === "useCase" ? 600 : 120)
    ) {
      if (key === "compare") {
        if (out.getAll(key).length < 3 && /^[a-z0-9-]+$/.test(value))
          out.append(key, value);
      } else out.set(key, value);
    }
  return out.toString();
}
