import { formText, intents, categoryValues, provinceValues } from "./inquiry";
import { publishableProducts } from "./catalog";
import { regions } from "./locations";
const fields = [
  "intent",
  "category",
  "product",
  "useCase",
  "startDate",
  "endDate",
  "company",
  "name",
  "email",
  "phone",
  "city",
  "province",
  "timeline",
  "quantity",
  "budget",
  "details",
] as const;
export function buildBrief(
  values: Record<string, unknown>,
  locale: "en" | "fr",
) {
  const t = formText[locale];
  const lines = fields.map((key) => {
    let value = typeof values[key] === "string" ? (values[key] as string) : "";
    if (key === "intent")
      value = t.intents[intents.findIndex((i) => i === value)] || value;
    if (key === "category")
      value =
        t.categories[categoryValues.findIndex((i) => i === value)] || value;
    if (key === "timeline")
      value =
        t.timelines[["soon", "1-3", "3-6", "exploring"].indexOf(value)] ||
        value;
    if (key === "product")
      value =
        publishableProducts().find((p) => p.slug === value)?.name[locale] ||
        value;
    if (key === "province" && provinceValues.some((p) => p === value))
      value = regions.find((r) => r.code === value)!.name[locale];
    return `${t[key]}: ${value}`;
  });
  return (
    (locale === "en"
      ? "BOTIX project brief — saved locally, not submitted."
      : "Projet BOTIX — enregistré localement, non transmis.") +
    "\n\n" +
    lines.join("\n")
  );
}
