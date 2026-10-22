import { test } from "node:test";
import assert from "node:assert/strict";
import { categories, pages, locales } from "../src/lib/content";
import { servicePage } from "../src/lib/journeys";
import { regions } from "../src/lib/locations";
import {
  publishableProducts,
  publishableManufacturers,
} from "../src/lib/catalog";
test("every linked category has fully bilingual content", () => {
  for (const category of categories) {
    const page = [...pages, servicePage].find((p) => p.slug === category.slug);
    assert.ok(page);
    for (const locale of locales) {
      assert.ok(page.title[locale]);
      assert.ok(page.intro[locale]);
      for (const section of page.sections) {
        assert.ok(section.title[locale]);
        assert.ok(section.body[locale]);
      }
    }
  }
});
test("national architecture has 13 distinct bilingual regional briefs", () => {
  assert.equal(regions.length, 13);
  assert.equal(new Set(regions.map((r) => r.code)).size, 13);
  for (const locale of locales) {
    assert.equal(new Set(regions.map((r) => r.focus[locale])).size, 13);
    assert.equal(new Set(regions.map((r) => r.checklist[locale])).size, 13);
  }
  assert.equal(new Set(pages.map((p) => p.slug)).size, pages.length);
});
test("unverified products and manufacturers are not published", () => {
  assert.equal(publishableProducts().length, 6);
  assert.ok(
    publishableProducts().every(
      (p) =>
        p.publication === "editorial" &&
        p.availability.status === "not-confirmed",
    ),
  );
  assert.equal(publishableManufacturers().length, 5);
});
