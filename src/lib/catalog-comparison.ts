import { publishableProducts } from "./catalog";
export function comparisonProducts(value: string | string[] | undefined) {
  const slugs = [
    ...new Set(Array.isArray(value) ? value : value ? [value] : []),
  ].slice(0, 3);
  return slugs.flatMap((slug) =>
    publishableProducts().filter((p) => p.slug === slug),
  );
}
