import Link from "next/link";
import { type Locale, ui, phone } from "@/lib/content";
export function Footer({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <Link className="brand" href={`/${locale}`}>
            BOTI<span className="brand-x">X</span>
          </Link>
          <p>
            {locale === "en"
              ? "Intelligent Robots. Real-World Solutions."
              : "Des robots intelligents. Des solutions concrètes."}
          </p>
        </div>
        <div className="footer-links">
          {[
            ["robots", t.robots],
            ["robot-rentals", t.rentals],
            ["locations", t.locations],
            ["contact", t.contact],
          ].map(([slug, label]) => (
            <Link key={slug} href={`/${locale}/${slug}`}>
              {label}
            </Link>
          ))}
        </div>
        <a className="footer-phone" href="tel:+18336969996">
          {phone}
          <span aria-hidden>↗</span>
        </a>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} BOTIX ·{" "}
          {locale === "en" ? "Commercial Robotics" : "Robotique commerciale"}
        </span>
        <span>
          {locale === "en"
            ? "Canada. Coast to coast to coast."
            : "Le Canada, d’un océan à l’autre."}
        </span>
        <div>
          <Link href={`/${locale}/privacy`}>{t.privacy}</Link>
          <Link href={`/${locale}/terms`}>{t.terms}</Link>
        </div>
      </div>
    </footer>
  );
}
