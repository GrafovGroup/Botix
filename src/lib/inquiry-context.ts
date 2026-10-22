import { journeys } from "./journeys";
import {
  intents,
  categoryValues,
  provinceValues,
  type Inquiry,
} from "./inquiry";
import { publishableProducts } from "./catalog";
export type InquiryContext = Partial<
  Pick<
    Inquiry,
    | "intent"
    | "category"
    | "product"
    | "useCase"
    | "city"
    | "startDate"
    | "endDate"
    | "province"
  >
>;
export function resolveInquiryContext(
  query: Record<string, string | string[] | undefined>,
): InquiryContext {
  const read = (key: string) =>
    typeof query[key] === "string" ? (query[key] as string) : "";
  const rawIntent = read("intent");
  const intent: Inquiry["intent"] = intents.some((i) => i === rawIntent)
    ? (rawIntent as Inquiry["intent"])
    : "general";
  const category = read("category");
  const product = publishableProducts().find(
    (p) =>
      p.slug === read("product") &&
      p.flags.inquiries &&
      p.inquiryOptions.some(
        (option) => option === (intent === "integration" ? "pilot" : intent),
      ),
  );
  return {
    intent,
    category:
      product?.category ||
      (categoryValues.some((c) => c === category)
        ? (category as Inquiry["category"])
        : undefined),
    product: product?.slug || "",
    city: read("city").slice(0, 120),
    province: provinceValues.find((p) => p === read("province")),
    startDate: validDate(read("startDate")),
    endDate: validDate(read("endDate")),
    useCase: read("useCase").slice(0, 600),
  };
}

function validDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    Number.isFinite(Date.parse(value)) &&
    new Date(value).toISOString().slice(0, 10) === value
    ? value
    : "";
}
export function inquiryHref(
  locale: "en" | "fr",
  context: InquiryContext,
  intent = context.intent || "general",
) {
  const next = resolveInquiryContext({ ...context, intent });
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(next))
    if (value) query.set(key, value);
  return `/${locale}/request-quote?${query}`;
}
export function pageInquiryContext(
  slug: string,
  locale: "en" | "fr" = "en",
): InquiryContext {
  const journey = journeys.find((j) => j.slug === slug);
  if (journey)
    return resolveInquiryContext({
      intent: journey.intent,
      category: journey.category,
      useCase: journey.title[locale],
    });
  if (slug === "humanoid-robots")
    return { intent: "pilot", category: "humanoid" };
  if (slug.startsWith("commercial-robots/"))
    return resolveInquiryContext({
      intent: "purchase",
      category: slug.split("/")[1],
    });
  if (slug === "robot-rentals" || slug.startsWith("robot-rentals/"))
    return { intent: "rental" };
  return { intent: "general" };
}
