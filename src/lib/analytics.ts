// No analytics provider or identifiers are installed. Integrators must pass explicit
// optional-analytics consent; never pass form values or other personal information.
export function track(
  consent: boolean,
  event: "quote_opened" | "category_opened",
  locale: "en" | "fr",
) {
  if (!consent || typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("botix:analytics", { detail: { event, locale } }),
  );
}
