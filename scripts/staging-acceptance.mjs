import { pathToFileURL } from "node:url";

const check = (ok, label) => {
  if (!ok) throw new Error(label);
};

export function stagingTarget(raw, authorized = false) {
  let target;
  try {
    target = new URL(raw);
  } catch {
    throw new Error("Invalid staging target");
  }
  check(
    !target.username &&
      !target.password &&
      !target.search &&
      !target.hash &&
      target.pathname === "/",
    "Use an origin without credentials, path or query",
  );
  const local = target.hostname === "127.0.0.1" && target.protocol === "http:";
  const remote = target.origin === "https://staging.botix.ca";
  check(
    local || (remote && authorized),
    "Only loopback or explicitly authorized HTTPS staging.botix.ca is allowed",
  );
  return target.origin;
}

export function sameOriginPath(value, origin) {
  let url;
  try {
    url = new URL(value, origin);
  } catch {
    throw new Error("Invalid resource URL");
  }
  check(
    url.origin === origin && !url.username && !url.password,
    "Cross-origin resource refused",
  );
  return url.pathname + url.search;
}

// GET only. No submissions, redirects, crawling arbitrary links or saved bodies.
export async function acceptStaging({
  target,
  canonicalOrigin,
  secret,
  authorized = false,
}) {
  const origin = stagingTarget(target, authorized);
  check(
    typeof secret === "string" && secret.length >= 32,
    "Missing staging credential",
  );
  const canonical = new URL(canonicalOrigin).origin;
  check(
    origin.startsWith("http://127.0.0.1:") || canonical === origin,
    "Remote canonical must match staging origin",
  );
  const auth = "Basic " + Buffer.from(`botix:${secret}`).toString("base64");
  const get = (resource, authenticated = true, extra = {}) =>
    fetch(origin + sameOriginPath(resource, origin), {
      method: "GET",
      headers: { ...(authenticated ? { Authorization: auth } : {}), ...extra },
      redirect: "manual",
      signal: AbortSignal.timeout(15000),
    });
  function protectedHeaders(response, label) {
    check(
      /noindex/.test(response.headers.get("x-robots-tag") || ""),
      label + ": noindex",
    );
    check(
      /private/.test(response.headers.get("cache-control") || "") &&
        /no-store/.test(response.headers.get("cache-control") || ""),
      label + ": private/no-store",
    );
  }
  for (const route of [
    "/",
    "/en",
    "/fr",
    "/api/health",
    "/api/inquiry",
    "/sitemap.xml",
    "/robots.txt",
    "/images/home-en.webp",
    "/en?_rsc=acceptance",
    "/_next/image?url=%2Fimages%2Fhome-en.webp&w=640&q=75",
  ]) {
    const response = await get(route, false, {
      "x-middleware-subrequest":
        "middleware:middleware:middleware:middleware:middleware",
    });
    check(response.status === 401, "Anonymous access must be denied");
    protectedHeaders(response, "Anonymous response");
  }
  const wrong = await get("/en", false, {
    Authorization:
      "Basic " +
      Buffer.from("botix:synthetic-wrong-password").toString("base64"),
  });
  check(wrong.status === 401, "Incorrect credential must be denied");
  const health = await get("/api/health");
  check(
    health.status === 200 && (await health.json()).status === "ok",
    "Authenticated health",
  );
  const inquiry = await get("/api/inquiry");
  check(
    inquiry.status === 200 && (await inquiry.json()).available === false,
    "Inquiry delivery must be disabled",
  );
  const root = await get("/");
  check([307, 308].includes(root.status), "Root redirect status");
  check(
    sameOriginPath(root.headers.get("location"), origin) === "/en",
    "Root redirect destination",
  );
  const robots = await get("/robots.txt");
  check(robots.status === 200, "Robots status");
  const rules = await robots.text();
  check(
    rules.includes("Disallow: /") && !rules.includes("Sitemap:"),
    "Preview robots",
  );
  const sitemap = await get("/sitemap.xml");
  check(sitemap.status === 200, "Sitemap status");
  protectedHeaders(sitemap, "Sitemap");
  const urls = [...(await sitemap.text()).matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (m) => m[1],
  );
  check(
    urls.length === 144 && new Set(urls).size === 144,
    "Expected 144 unique routes",
  );
  // Validate the entire sitemap before requesting any resource with credentials.
  const paths = urls.map((url) => sameOriginPath(url, canonical));
  check(
    new Set(paths).size === 144 &&
      paths.filter((p) => p === "/en" || p.startsWith("/en/")).length === 72 &&
      paths.every((p) => /^\/(en|fr)(?:\/|$)/.test(p) && !p.includes("?")),
    "Unexpected sitemap path",
  );
  for (const route of paths) {
    const response = await get(route);
    check(response.status === 200, "Content route status: " + route);
    protectedHeaders(response, "Content route");
    check(
      response.headers.get("x-content-type-options") === "nosniff" &&
        response.headers.get("x-frame-options") === "DENY",
      "Security headers",
    );
    const html = await response.text();
    check(
      html.includes(`rel="canonical" href="${canonical}${route}"`),
      "Canonical: " + route,
    );
    check(
      html.includes(`lang="${route.split("/")[1]}-CA"`) &&
        html.includes('hrefLang="en-CA"') &&
        html.includes('hrefLang="fr-CA"'),
      "Locale metadata",
    );
    check(
      !html.includes("tel:+18336969996") &&
        !html.includes('"telephone":"+18336969996"'),
      "Unverified phone must remain hidden",
    );
    if (route === "/en") {
      check(
        !html.includes("/_next/image?"),
        "Preview must use authenticated originals",
      );
      const assets = [
        ...html.matchAll(/(?:src|href)="([^"<>]+\.(?:js|css)(?:\?[^"<>]*)?)"/g),
      ].map((m) => sameOriginPath(m[1].replaceAll("&amp;", "&"), origin));
      check(assets.length > 0, "No built assets discovered");
      for (const asset of new Set(assets)) {
        check(
          (await get(asset, false)).status === 401,
          "Anonymous asset denied",
        );
        const response = await get(asset);
        check(response.status === 200, "Authenticated asset");
        protectedHeaders(response, "Asset");
      }
    }
  }
  for (const locale of ["en", "fr"]) {
    const image = await get(`/images/home-${locale}.webp`);
    check(
      image.status === 200 &&
        image.headers.get("content-type")?.startsWith("image/"),
      "Original image",
    );
    protectedHeaders(image, "Image");
    check(
      (await get(`/${locale}/does-not-exist`)).status === 404,
      "Localized 404",
    );
  }
  for (const [route, required, absent] of [
    ["/en/robots?type=humanoid", "Unitree G1", "MiR250"],
    ["/fr/robots?query=nettoyage", "PUDU CC1", "Unitree G1"],
  ]) {
    const response = await get(route);
    check(response.status === 200, "Dynamic filter status");
    const html = await response.text();
    check(
      html.includes(required) && !html.includes(absent),
      "Dynamic filter result",
    );
  }
  return {
    routes: paths.length,
    mode: "GET-only",
    result: "HTTP checks passed; manual host/browser acceptance still required",
  };
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  async function main() {
    try {
      const result = await acceptStaging({
        target: process.env.STAGING_URL,
        canonicalOrigin:
          process.env.STAGING_CANONICAL_ORIGIN || process.env.STAGING_URL,
        secret: process.env.PREVIEW_ACCESS_SECRET,
        authorized: process.env.STAGING_TEST_AUTHORIZED === "true",
      });
      console.log(JSON.stringify(result));
    } catch {
      // Network/parser/assertion errors may carry URLs or body data: never echo them.
      console.error(
        "Staging acceptance failed. Check target authorization, TLS, credentials and acceptance matrix; no response bodies were saved.",
      );
      process.exitCode = 1;
    }
  }
  void main();
}
