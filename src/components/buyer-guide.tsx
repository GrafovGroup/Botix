import Link from "next/link";
import { buyerGuides } from "@/lib/buyer-guides";
import type { Locale } from "@/lib/content";
import { inquiryHref } from "@/lib/inquiry-context";

export function BuyerGuide({
  route,
  locale,
}: {
  route: string;
  locale: Locale;
}) {
  const guide = buyerGuides.find((item) => item.route === route);
  if (!guide) return null;
  const en = locale === "en";
  return (
    <section
      className="section buyer-guide"
      id={guide.id}
      aria-labelledby={`${guide.id}-title`}
    >
      <p className="eyebrow">
        {en ? "Buyer planning guide" : "Guide de planification"}
      </p>
      <h2 id={`${guide.id}-title`}>{guide.title[locale]}</h2>
      <p className="lead">{guide.intro[locale]}</p>
      <div className="buyer-paths">
        {guide.steps.map((step, index) => (
          <article key={index}>
            <p className="eyebrow">0{index + 1}</p>
            <h3>{step.title[locale]}</h3>
            <p>{step.body[locale]}</p>
          </article>
        ))}
      </div>
      <aside className="region-note">
        <h3>
          {en
            ? "What to include in your brief"
            : "À inclure dans votre demande"}
        </h3>
        <p>{guide.brief[locale]}</p>
        <Link
          className="button"
          href={inquiryHref(locale, {
            intent: guide.intent,
            category: guide.category === "unsure" ? undefined : guide.category,
            useCase: guide.title[locale],
          })}
        >
          {en ? "PREPARE MY PROJECT" : "PRÉPARER MON PROJET"} ↗
        </Link>
      </aside>
    </section>
  );
}
