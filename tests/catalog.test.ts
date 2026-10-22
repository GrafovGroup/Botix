import { test } from "node:test";
import assert from "node:assert/strict";
import {
  products,
  manufacturers,
  validateCatalog,
  filterProducts,
  canTransact,
  publishableProducts,
  productSchema,
} from "../src/lib/catalog";
import { resolveInquiryContext } from "../src/lib/inquiry-context";
import { cities } from "../src/lib/cities";
import { regions } from "../src/lib/locations";
import {
  journeys,
  rentalJourneys,
  industryJourneys,
} from "../src/lib/journeys";
test("all six sourced editorial records validate and cannot be purchased online", () => {
  assert.deepEqual(validateCatalog(products), []);
  assert.equal(publishableProducts().length, 6);
  assert.ok(
    products.every(
      (p) =>
        !canTransact(p) &&
        p.publication === "editorial" &&
        p.availability.status === "not-confirmed",
    ),
  );
});
test("publication rejects missing evidence, facts, translations and manufacturer references", () => {
  const base = products[0];
  const invalid = [
    { ...base, evidence: { ...base.evidence, approvedForPublication: false } },
    { ...base, name: { en: "G1", fr: "" } },
    { ...base, manufacturer: "missing" },
    {
      ...base,
      evidence: { ...base.evidence, sourceUrl: "http://example.com" },
    },
    {
      ...base,
      facts: [
        {
          ...base.facts[0],
          evidence: { ...base.evidence, checkedOn: "yesterday" },
        },
      ],
    },
    {
      ...base,
      facts: [
        {
          ...base.facts[0],
          evidence: { ...base.evidence, approvedForPublication: false },
        },
      ],
    },
    {
      ...base,
      availability: {
        status: "verified",
        description: { en: "Available", fr: "Disponible" },
        evidence: base.evidence,
      },
    },
  ];
  for (const entry of invalid) assert.ok(validateCatalog([entry]).length > 0);
  assert.ok(validateCatalog([base, base]).some((e) => e.includes("Duplicate")));
});
test("draft entries are filtered and a verified claim still requires evidence", () => {
  const draft = {
    ...products[0],
    publication: "draft" as const,
    evidence: { ...products[0].evidence, approvedForPublication: false },
  };
  assert.deepEqual(filterProducts([draft], {}, "en"), []);
  const invalid = {
    ...products[0],
    publication: "verified",
    availability: {
      status: "verified",
      description: { en: "Available", fr: "Disponible" },
      evidence: { ...products[0].evidence, approvedForPublication: false },
    },
  };
  assert.ok(validateCatalog([invalid]).length > 0);
});
test("media requires rights record and cannot be reused across placements", () => {
  const media = {
    locale: "en",
    src: "/images/owned.webp",
    alt: { en: "Robot", fr: "Robot" },
    source: "https://example.com/asset",
    rights: "owned",
    rightsRecord: "Internal asset register",
    placement: "product-one",
  };
  assert.equal(
    productSchema.safeParse({
      ...products[0],
      media: [{ ...media, rights: "unknown" }],
    }).success,
    false,
  );
  assert.ok(
    validateCatalog([
      { ...products[0], media: [media] },
      { ...products[1], media: [{ ...media, placement: "product-two" }] },
    ]).some((e) => e.includes("Reused media")),
  );
});
test("filters combine type, application, industry and inquiry path", () => {
  assert.deepEqual(
    filterProducts(
      products,
      {
        type: "service",
        application: "guest",
        industry: "hospitality",
        intent: "rental",
      },
      "en",
    ).map((p) => p.slug),
    ["bellabot"],
  );
  assert.deepEqual(
    filterProducts(
      products,
      { type: "humanoid", application: "floorcare" },
      "en",
    ),
    [],
  );
  assert.equal(filterProducts(products, { type: "unknown" }, "en").length, 0);
});
test("search normalises accents and sorting is deterministic without mutating seeds", () => {
  const original = products.map((p) => p.slug);
  assert.equal(
    filterProducts(products, { query: "NETTOYAGE" }, "fr")[0].slug,
    "pudu-cc1",
  );
  assert.equal(
    filterProducts(products, { query: "humanoide" }, "fr")[0].slug,
    "unitree-g1",
  );
  assert.equal(filterProducts(products, {}, "en")[0].slug, "unitree-g1");
  assert.equal(
    filterProducts(products, { sort: "name-asc" }, "en")[0].slug,
    "bellabot",
  );
  assert.equal(
    filterProducts(products, { sort: "name-desc" }, "en")[0].slug,
    "ur5e",
  );
  assert.deepEqual(
    products.map((p) => p.slug),
    original,
  );
});
test("query prefill ignores unknown products and unsafe enumerations", () => {
  const valid = resolveInquiryContext({
    intent: "rental",
    product: "unitree-g1",
    category: "cleaning",
    city: "Toronto",
  });
  assert.equal(valid.category, "humanoid");
  assert.equal(valid.product, "unitree-g1");
  assert.equal(valid.intent, "rental");
  assert.equal(
    resolveInquiryContext({ intent: "rental", product: "mir250" }).product,
    "",
  );
  const invalid = resolveInquiryContext({
    intent: "bad",
    category: "bad",
    product: "draft-secret",
    city: "x".repeat(200),
  });
  assert.equal(invalid.intent, "general");
  assert.equal(invalid.product, "");
  assert.equal(invalid.category, undefined);
  assert.equal(invalid.city?.length, 120);
});
test("buyer journeys and national guides have distinct bilingual substance", () => {
  assert.equal(rentalJourneys.length, 5);
  assert.equal(industryJourneys.length, 8);
  assert.equal(cities.length, 16);
  for (const locale of ["en", "fr"] as const) {
    assert.equal(
      new Set(cities.map((c) => c.focus[locale])).size,
      cities.length,
    );
    assert.equal(
      new Set(cities.map((c) => c.checklist[locale])).size,
      cities.length,
    );
    assert.ok(
      journeys.every(
        (j) =>
          j.intro[locale] && j.considerations[locale] && j.measurement[locale],
      ),
    );
  }
  assert.ok(cities.every((c) => regions.some((r) => r.slug === c.region)));
  assert.equal(
    new Set(manufacturers.map((m) => m.slug)).size,
    manufacturers.length,
  );
});
