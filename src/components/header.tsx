"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { type Locale, ui } from "@/lib/content";
export function Header({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const t = ui[locale];
  const links = [
    ["robots", t.robots],
    ["industries", t.industries],
    ["solutions", t.solutions],
    ["robot-rentals", t.rentals],
    ["about", t.about],
  ];
  const alternate = path.replace(
    /^\/(en|fr)(?=\/|$)/,
    locale === "en" ? "/fr" : "/en",
  );
  return (
    <>
      <a className="skip" href="#main">
        {t.skip}
      </a>
      <header className="header">
        <Link
          href={`/${locale}`}
          className="brand"
          aria-label="BOTIX"
          onClick={() => setOpen(false)}
        >
          BOTI<span className="brand-x">X</span>
          <small>
            {locale === "en" ? "COMMERCIAL ROBOTICS" : "ROBOTIQUE COMMERCIALE"}
          </small>
        </Link>
        <nav className="desktop-nav" aria-label={t.menu}>
          {links.map(([slug, label]) => (
            <Link
              key={slug}
              href={`/${locale}/${slug}`}
              aria-current={path === `/${locale}/${slug}` ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Suspense
            fallback={
              <Link className="language" href={alternate}>
                {locale === "en" ? "FR" : "EN"}
              </Link>
            }
          >
            <LocaleLink
              alternate={alternate}
              locale={locale}
              close={() => setOpen(false)}
            />
          </Suspense>
          <Link
            className="button small header-quote"
            href={`/${locale}/request-quote`}
          >
            {t.quote}
            <span aria-hidden>↗</span>
          </Link>
          <button
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? t.close : t.menu}
            <span aria-hidden>{open ? "−" : "+"}</span>
          </button>
        </div>
      </header>
      {open && (
        <nav className="mobile-nav" id="mobile-nav" aria-label={t.menu}>
          {[...links, ["request-quote", t.quote]].map(([slug, label]) => (
            <Link
              key={slug}
              href={`/${locale}/${slug}`}
              onClick={() => setOpen(false)}
            >
              {label}
              <span aria-hidden>↗</span>
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}

function LocaleLink({
  alternate,
  locale,
  close,
}: {
  alternate: string;
  locale: Locale;
  close: () => void;
}) {
  const params = useSearchParams();
  const query = params.toString();
  return (
    <Link
      className="language"
      href={alternate + (query ? `?${query}` : "")}
      hrefLang={locale === "en" ? "fr-CA" : "en-CA"}
      lang={locale === "en" ? "fr" : "en"}
      onClick={close}
    >
      {locale === "en" ? "FR" : "EN"}
    </Link>
  );
}
