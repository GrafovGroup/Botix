"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { contextHrefFromEntries } from "@/lib/inquiry-navigation";
import type { Inquiry } from "@/lib/inquiry";
export function liveInquiryHref(
  locale: "en" | "fr",
  intent?: Inquiry["intent"],
) {
  const form = document.querySelector<HTMLFormElement>(
    'form[data-quote-page="true"]',
  );
  if (!form) return null;
  return contextHrefFromEntries(locale, new FormData(form).entries(), intent);
}
export function InquiryContextLink({
  href,
  locale,
  intent,
  current,
  children,
}: {
  href: string;
  locale: "en" | "fr";
  intent: Inquiry["intent"];
  current: boolean;
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      onClick={(e) => {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
          return;
        const destination = liveInquiryHref(locale, intent);
        if (destination) {
          e.preventDefault();
          router.push(destination);
        }
      }}
    >
      {children}
    </Link>
  );
}
