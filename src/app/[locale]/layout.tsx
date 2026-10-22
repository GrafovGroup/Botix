import { notFound } from "next/navigation";
import { isLocale } from "@/lib/content";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "../globals.css";
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={`${locale}-CA`}>
      <body>
        <Header locale={locale} />
        <main id="main">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
