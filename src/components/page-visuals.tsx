import Image from "next/image";
import assets from "@/lib/page-images.json";
import type { Locale } from "@/lib/content";
/** Explicit route + placement mapping. No category fallback or cross-page reuse. */
export function PageVisuals({
  locale,
  path = "",
  placement,
}: {
  locale: Locale;
  path?: string;
  placement?: "overview" | "detail";
}) {
  const route = `/${locale}${path ? "/" + path : ""}`;
  const images = assets.filter(
    (a) => a.route === route && (!placement || a.placement === placement),
  );
  if (!images.length) return null;
  return (
    <div
      className={`page-visuals section ${images.length === 1 ? "single-visual" : ""}`}
    >
      {images.map((image) => (
        <figure
          key={image.id}
          className={`page-visual visual-${image.placement}`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={1536}
            height={1024}
            sizes={
              images.length === 1
                ? "(max-width: 800px) 100vw, 88vw"
                : "(max-width: 800px) 100vw, 44vw"
            }
            loading="lazy"
          />
          {(path.startsWith("products/") ||
            path.startsWith("manufacturers")) && (
            <figcaption className="visual-context">
              {image.placement === "overview"
                ? locale === "en"
                  ? "WORKSPACE ASSESSMENT"
                  : "ÉVALUATION DU MILIEU DE TRAVAIL"
                : locale === "en"
                  ? "INTEGRATION PLANNING"
                  : "PLANIFICATION DE L’INTÉGRATION"}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
