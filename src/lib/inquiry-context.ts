import { intents, categoryValues, type Inquiry } from "./inquiry";
import { publishableProducts } from "./catalog";
export type InquiryContext = Partial<
  Pick<Inquiry, "intent" | "category" | "product" | "useCase" | "city">
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
    useCase: read("useCase").slice(0, 600),
  };
}
