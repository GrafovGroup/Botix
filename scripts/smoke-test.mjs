import assert from "node:assert/strict";
const base = process.env.TEST_URL || "http://127.0.0.1:3000";
const request = (path, options) =>
  fetch(`${base}${path}`, { ...options, signal: AbortSignal.timeout(60000) });
const readiness = await (await request("/api/inquiry")).json();
assert.equal(
  readiness.available,
  false,
  "Refusing smoke submissions: delivery must be disabled",
);
const sitemap = await (await request("/sitemap.xml")).text();
const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (m) => new URL(m[1]).pathname,
);
assert.equal(paths.length, 144);
assert.equal(new Set(paths).size, paths.length);
assert.ok(
  ["127.0.0.1", "localhost"].includes(new URL(base).hostname),
  "Smoke submission tests are local-only",
);
const internal = new Set();
for (let i = 0; i < paths.length; i += 4) {
  await Promise.all(
    paths.slice(i, i + 4).map(async (path) => {
      const res = await request(path);
      assert.equal(res.status, 200, path);
      const html = await res.text();
      const locale = path.split("/")[1];
      assert.ok(
        !html.includes("tel:+18336969996"),
        `${path}: unverified phone hidden`,
      );
      assert.ok(
        !html.includes('"telephone":"+18336969996"'),
        `${path}: unverified structured phone hidden`,
      );
      assert.ok(html.includes(`lang="${locale}-CA"`), `${path}: lang`);
      assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${path}: h1`);
      assert.ok(
        html.includes(`rel="canonical" href="https://botix.ca${path}"`),
        `${path}: canonical`,
      );
      assert.ok(
        html.includes('hrefLang="en-CA"') && html.includes('hrefLang="fr-CA"'),
        `${path}: hreflang`,
      );
      for (const m of html.matchAll(/href="(\/(?:en|fr)(?:\/[^"?#]*)?)"/g))
        internal.add(m[1]);
      assert.ok(
        !/coming.soon|awaiting.launch|not.yet.connected/i.test(html),
        `${path}: forbidden wording`,
      );
    }),
  );
}
for (const path of internal)
  assert.ok(paths.includes(path), `Unregistered internal link: ${path}`);
for (const path of [
  "/en/does-not-exist",
  "/fr/does-not-exist",
  "/en/products/unverified",
  "/fr/manufacturers/unverified",
])
  assert.equal((await request(path)).status, 404, path);
const redirect = await request("/", { redirect: "manual" });
assert.ok([307, 308].includes(redirect.status));
assert.equal(new URL(redirect.headers.get("location"), base).pathname, "/en");
for (const locale of ["en", "fr"]) {
  const res = await request(
    `/_next/image?url=%2Fimages%2Fhome-${locale}.webp&w=1080&q=75`,
  );
  assert.equal(res.status, 200);
  assert.ok(res.headers.get("content-type")?.startsWith("image/"));
}
const { token } = await (await request("/api/inquiry")).json();
await new Promise((r) => setTimeout(r, 2100));
const payload = {
  locale: "fr",
  intent: "pilot",
  category: "humanoid",
  useCase: "Supervised handling research",
  product: "unitree-g1",
  company: "Local QA",
  name: "Test User",
  email: "qa@example.com",
  phone: "+1 416 555 1234",
  city: "Toronto",
  province: "ON",
  timeline: "3-6",
  quantity: 1,
  budget: "",
  details: "Local test of a supervised robot demonstration.",
  consent: true,
  website: "",
  token,
};
const post = (data, origin = base) =>
  request("/api/inquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: origin },
    body: JSON.stringify(data),
  });
const unconfigured = await post(payload);
assert.equal(unconfigured.status, 503);
assert.equal((await unconfigured.json()).error, "unconfigured");
assert.equal((await post(payload, "https://untrusted.example")).status, 403);
assert.equal((await post({ ...payload, consent: false })).status, 400);
assert.equal((await post({ ...payload, website: "spam" })).status, 400);
assert.equal(
  (await post({ ...payload, details: "x".repeat(20000) })).status,
  413,
);
console.log(
  `Passed: ${paths.length} bilingual routes, ${internal.size} unique internal links, metadata, 404s, root redirect, image optimisation, and 5 inquiry API cases.`,
);

for (const [path, required, excluded] of [
  ["/en/robots?type=humanoid", "Unitree G1", "MiR250"],
  ["/fr/robots?type=service&industry=hospitality", "BellaBot", "PUDU CC1"],
  ["/fr/robots?query=nettoyage", "PUDU CC1", "Unitree G1"],
  [
    "/en/robots?type=humanoid&application=floorcare",
    "Let’s broaden the search.",
    "product-monogram",
  ],
]) {
  const html = await (await request(path)).text();
  assert.ok(html.includes(required), path);
  assert.ok(!html.includes(excluded), path);
}
const quote = await (
  await request(
    "/en/request-quote?intent=rental&product=unitree-g1&category=humanoid",
  )
).text();
assert.ok(
  quote.includes(
    'href="/fr/request-quote?intent=rental&amp;product=unitree-g1&amp;category=humanoid"',
  ),
  "Language switch preserves inquiry context",
);
assert.ok(quote.includes('name="product"'));
assert.ok(quote.includes('name="startDate"'));
assert.ok(quote.includes('value="unitree-g1" selected=""'));
assert.equal(
  (
    await post({
      ...payload,
      intent: "rental",
      startDate: "2026-12-02",
      endDate: "2026-12-01",
    })
  ).status,
  400,
);
assert.equal((await post({ ...payload, category: "cleaning" })).status, 400);
console.log(
  "Passed: catalogue filters, French search, empty state, contextual quote and rental/product rejection.",
);

const dates = await (
  await request(
    "/fr/request-quote?intent=rental&product=unitree-g1&startDate=2026-12-01&endDate=2026-12-03&province=QC&city=Montreal&useCase=Supervised%20demonstration",
  )
).text();
assert.ok(dates.includes('value="2026-12-01"'));
assert.ok(dates.includes('value="2026-12-03"'));
assert.ok(dates.includes("startDate=2026-12-01&amp;endDate=2026-12-03"));
assert.ok(dates.includes("Enregistrer mon projet"));
console.log(
  "Passed: verified-only phone, disabled-delivery guard and contextual rental dates.",
);
