import assert from "node:assert/strict";
import { readFileSync, existsSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import sitemap from "../src/app/sitemap";
import assets from "../src/lib/page-images.json";
const register = JSON.parse(
  readFileSync("docs/page-image-register.json", "utf8"),
) as Array<{
  id: string;
  src: string;
  sha256: string;
  sourceSha256: string;
  bytes: number;
  prompt?: string;
  placementBrief?: string;
  visualReview?: string;
}>;
assert.equal(
  register.length,
  assets.length,
  "Every planned placement needs provenance",
);
const provenance = new Map(register.map((a) => [a.id, a]));
assert.equal(provenance.size, register.length, "Duplicate provenance IDs");
const routes = sitemap().map((r) => new URL(r.url).pathname);
assert.equal(routes.length, 144);
const files = new Set<string>(),
  hashes = new Set<string>();
for (const route of routes) {
  const listed = assets.filter((a) => a.route === route);
  assert.equal(
    listed.length,
    route === "/en" || route === "/fr" ? 1 : 2,
    route,
  );
  for (const image of listed) {
    assert.ok(!files.has(image.src), `Reused placement: ${image.src}`);
    files.add(image.src);
    assert.ok(image.alt.length > 15);
    assert.ok(existsSync("public" + image.src), `Missing ${image.src}`);
    const hash = createHash("sha256")
      .update(readFileSync("public" + image.src))
      .digest("hex");
    const record = provenance.get(image.id);
    assert.ok(record, `Missing provenance: ${image.id}`);
    assert.equal(
      record.src,
      image.src,
      `Provenance placement mismatch: ${image.id}`,
    );
    assert.equal(record.sha256, hash, `Changed registered image: ${image.id}`);
    assert.equal(
      record.bytes,
      statSync("public" + image.src).size,
      `Stale size: ${image.id}`,
    );
    assert.match(
      record.sourceSha256,
      /^[a-f0-9]{64}$/,
      `Missing source hash: ${image.id}`,
    );
    assert.ok(
      record.prompt || record.placementBrief,
      `Missing generation/placement brief: ${image.id}`,
    );
    assert.ok(
      record.visualReview && !/pending/i.test(record.visualReview),
      `Visual review incomplete: ${image.id}`,
    );
    assert.ok(!hashes.has(hash), `Duplicate image: ${image.src}`);
    hashes.add(hash);
  }
}
for (const locale of ["en", "fr"]) {
  const file = `public/images/home-${locale}.webp`;
  const hash = createHash("sha256").update(readFileSync(file)).digest("hex");
  assert.ok(!hashes.has(hash));
  hashes.add(hash);
}
assert.equal(hashes.size, 288);
console.log(
  "PASS: 144 routes, 288 unique image placements including two original homepage heroes, no missing files or exact duplicates.",
);
