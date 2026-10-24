"use client";
import { Arrow } from "@/components/icons";
import Link from "next/link";
import { navigationQuery } from "@/lib/navigation-query";
import { liveInquiryHref } from "./inquiry-context-link";
import { Brand } from "./brand";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
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
          <Brand />
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
            <Arrow />
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
              <Arrow />
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
  const router = useRouter();
  const params = useSearchParams();
  const query = navigationQuery(alternate, params.entries());
  return (
    <Link
      className="language"
      href={alternate + (query ? `?${query}` : "")}
      hrefLang={locale === "en" ? "fr-CA" : "en-CA"}
      lang={locale === "en" ? "fr" : "en"}
      onClick={(e) => {
        close();
        if (
          e.button !== 0 ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          !alternate.endsWith("/request-quote")
        )
          return;
        const destination = liveInquiryHref(locale === "en" ? "fr" : "en");
        if (destination) {
          e.preventDefault();
          router.push(destination);
        }
      }}
    >
      {locale === "en" ? "FR" : "EN"}
    </Link>
  );
}
