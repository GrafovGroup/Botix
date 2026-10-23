// Read-only acceptance for the authorized public BOTIX deployment.
import assert from "node:assert/strict";
const origin = "https://botix.ca";
const get = (p) => {
  const u = new URL(p, origin);
  assert.equal(u.origin, origin);
  return fetch(u, { redirect: "manual", signal: AbortSignal.timeout(20000) });
};
const health = await get("/api/health");
assert.equal(health.status, 200);
assert.equal((await health.json()).status, "ok");
assert.equal((await (await get("/api/inquiry")).json()).available, false);
const root = await get("/");
assert.ok([307, 308].includes(root.status));
assert.equal(new URL(root.headers.get("location"), origin).pathname, "/en");
const robots = await (await get("/robots.txt")).text();
assert.ok(
  robots.includes("Allow: /") &&
    robots.includes("https://botix.ca/sitemap.xml"),
);
assert.ok(!/^Disallow: \/$/m.test(robots));
const sitemap = await get("/sitemap.xml");
assert.equal(sitemap.status, 200);
const urls = [...(await sitemap.text()).matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (m) => m[1],
);
assert.equal(new Set(urls).size, 144);
for (const url of urls) {
  const u = new URL(url);
  assert.equal(u.origin, origin);
  const r = await get(url);
  assert.equal(r.status, 200, url);
  assert.ok(!/noindex/.test(r.headers.get("x-robots-tag") || ""), url);
  assert.equal(r.headers.get("x-content-type-options"), "nosniff");
  assert.equal(r.headers.get("x-frame-options"), "DENY");
  const html = await r.text();
  assert.ok(html.includes(`rel="canonical" href="${url}"`), url);
  assert.ok(
    html.includes('hrefLang="en-CA"') && html.includes('hrefLang="fr-CA"'),
  );
  assert.ok(!html.includes("tel:+18336969996"));
  if (u.pathname === "/en") {
    const assets = [
      ...html.matchAll(/(?:src|href)="([^"<>]+\.(?:js|css)(?:\?[^"<>]*)?)"/g),
    ].map((m) => m[1].replaceAll("&amp;", "&"));
    assert.ok(assets.length);
    for (const asset of new Set(assets))
      assert.equal((await get(asset)).status, 200, asset);
  }
}
for (const locale of ["en", "fr"]) {
  assert.equal((await get(`/${locale}/does-not-exist`)).status, 404);
  const r = await get(`/images/home-${locale}.webp`);
  assert.equal(r.status, 200);
  assert.ok(r.headers.get("content-type").startsWith("image/"));
}
for (const [url, yes, no] of [
  ["/en/robots?type=humanoid", "Unitree G1", "MiR250"],
  ["/fr/robots?query=nettoyage", "PUDU CC1", "Unitree G1"],
]) {
  const r = await get(url);
  assert.equal(r.status, 200);
  const h = await r.text();
  assert.ok(h.includes(yes) && !h.includes(no));
}
const image = await get("/_next/image?url=%2Fimages%2Fhome-en.webp&w=640&q=75");
assert.equal(image.status, 200);
assert.ok(image.headers.get("content-type").startsWith("image/"));
console.log(
  "PASS: 144 public bilingual routes, metadata, indexing, assets, optimized image, filters, 404s and disabled delivery. GET only.",
);

for (const locale of ["en", "fr"]) {
  const response = await get(
    `/${locale}/robots?compare=unitree-g1&compare=pudu-cc1`,
  );
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.ok(
    html.includes("comparison-table") &&
      html.includes("Unitree G1") &&
      html.includes("PUDU CC1"),
  );
  assert.ok(html.includes(`/${locale}/request-quote?intent=pilot`));
  const hub = await (await get(`/${locale}/humanoid-robots`)).text();
  assert.ok(hub.includes("buyer-paths"));
  const city = await (
    await get(`/${locale}/locations/cities/toronto-gta`)
  ).text();
  assert.ok(city.includes(`/${locale}/commercial-robots/cleaning`));
}
console.log(
  "PASS: hosted Phase 2 comparison, contextual inquiry links, buyer pathways and local category links.",
);
