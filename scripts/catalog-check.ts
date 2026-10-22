import { readFileSync, existsSync } from "node:fs";
import {
  products,
  manufacturers,
  validateCatalog,
  productSchema,
  manufacturerSchema,
} from "../src/lib/catalog";
const file = process.argv[2];
const input = file
  ? JSON.parse(readFileSync(file, "utf8"))
  : { products, manufacturers };
if (!Array.isArray(input.products) || !Array.isArray(input.manufacturers))
  throw new Error("Expected {products: [], manufacturers: []}");
const errors = validateCatalog(input.products, input.manufacturers);
const cutoff = Date.now() - 180 * 86400000;
for (const raw of input.products) {
  const parsed = productSchema.safeParse(raw);
  if (!parsed.success) continue;
  const p = parsed.data;
  if (p.publication !== "draft") {
    const evidence = [
      p.evidence,
      ...p.facts.map((f) => f.evidence),
      ...(p.availability.status === "verified"
        ? [p.availability.evidence]
        : []),
    ];
    if (evidence.some((e) => Date.parse(e.checkedOn) < cutoff))
      errors.push(`${p.slug}: source review older than 180 days`);
    for (const m of p.media)
      if (!existsSync(`public${m.src}`))
        errors.push(`${p.slug}: missing media ${m.src}`);
  }
}
for (const raw of input.manufacturers) {
  const parsed = manufacturerSchema.safeParse(raw);
  if (!parsed.success) continue;
  const m = parsed.data;
  if (
    m.evidence.approvedForPublication &&
    Date.parse(m.evidence.checkedOn) < cutoff
  )
    errors.push(`${m.slug}: manufacturer review older than 180 days`);
  if (
    m.relationship.status === "verified" &&
    Date.parse(m.relationship.evidence.checkedOn) < cutoff
  )
    errors.push(`${m.slug}: relationship review older than 180 days`);
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else
  console.log(
    `Validated ${input.products.length} products and ${input.manufacturers.length} manufacturers. Import is read-only; publish through reviewed source changes.`,
  );
