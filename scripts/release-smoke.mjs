// Isolated production and preview HTTP checks. No browser, deployment or receiver.
import { spawn } from "node:child_process";
import { once } from "node:events";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
const artifact =
  process.env.BOTIX_STANDALONE === "true"
    ? JSON.parse(await readFile("artifacts/latest.json", "utf8")).directory
    : null;
const build = artifact
  ? JSON.parse(await readFile(path.join(artifact, "release.json"), "utf8"))
  : null;
const port = 3097;
const base = `http://127.0.0.1:${port}`;
const secret = "synthetic-preview-password-for-local-checks";
const request = (path, headers = {}) =>
  fetch(base + path, {
    headers,
    redirect: "manual",
    signal: AbortSignal.timeout(10000),
  });
async function run(mode, check, password = secret) {
  const child = spawn(
    process.execPath,
    artifact
      ? [
          path.join(
            artifact,
            mode === build.siteEnv && password ? "start.cjs" : "server.js",
          ),
        ]
      : [
          "node_modules/next/dist/bin/next",
          "start",
          "--hostname",
          "127.0.0.1",
          "--port",
          String(port),
        ],
    {
      stdio: ["ignore", "pipe", "pipe"],
      env: {
        ...process.env,
        NODE_ENV: "production",
        SITE_ENV: mode,
        SITE_URL: build?.siteUrl || "",
        HOSTNAME: "127.0.0.1",
        PORT: String(port),
        PREVIEW_ACCESS_SECRET: password,
        INQUIRY_DELIVERY_ENABLED: "false",
        INQUIRY_WEBHOOK_URL: "",
        INQUIRY_WEBHOOK_SECRET: "",
        INQUIRY_SIGNING_SECRET: "",
        INQUIRY_RECEIVER_VERIFIED: "false",
        INQUIRY_EDGE_RATE_LIMIT_CONFIRMED: "false",
        TRUST_PROXY: "false",
      },
    },
  );
  let log = "";
  child.stdout.on("data", (chunk) => {
    log += chunk;
  });
  child.stderr.on("data", (chunk) => {
    log += chunk;
  });
  const exited = once(child, "exit");
  try {
    let ready = false;
    for (let i = 0; i < 100; i++) {
      if (child.exitCode !== null) throw new Error(`Server exited: ${log}`);
      if (!log.includes("Ready in")) {
        await new Promise((r) => setTimeout(r, 100));
        continue;
      }
      try {
        await request("/api/health");
        ready = true;
        break;
      } catch {
        await new Promise((r) => setTimeout(r, 100));
      }
    }
    assert.ok(ready, "Local server readiness timeout");
    await check();
  } finally {
    child.kill("SIGTERM");
    const stopTimer = setTimeout(() => child.kill("SIGKILL"), 5000);
    try {
      await exited;
    } finally {
      clearTimeout(stopTimer);
    }
  }
}
if (!build || build.siteEnv === "production")
  await run("production", async () => {
    const health = await request("/api/health");
    assert.equal(health.status, 200);
    assert.deepEqual(await health.json(), { status: "ok", service: "botix" });
    assert.equal(health.headers.get("cache-control"), "no-store");
    const page = await request("/en");
    assert.equal(page.headers.get("x-content-type-options"), "nosniff");
    assert.equal(page.headers.get("referrer-policy"), "no-referrer");
    assert.ok(
      page.headers
        .get("content-security-policy")
        .includes("frame-ancestors 'none'"),
    );
    assert.equal(page.headers.get("x-robots-tag"), null);
    const robots = await (await request("/robots.txt")).text();
    assert.ok(
      robots.includes("Allow: /") &&
        robots.includes("Sitemap: https://botix.ca/sitemap.xml"),
    );
    const smoke = spawn(process.execPath, ["scripts/smoke-test.mjs"], {
      stdio: "inherit",
      env: {
        ...process.env,
        TEST_URL: base,
        TEST_ORIGIN: artifact ? "https://botix.ca" : base,
      },
    });
    const [code] = await once(smoke, "exit");
    assert.equal(code, 0, "Production route smoke");
  });
await run("preview", async () => {
  for (const path of [
    "/",
    "/en",
    "/fr/robots",
    "/api/inquiry",
    "/api/health",
    "/robots.txt",
    "/sitemap.xml",
    "/images/home-en.webp",
    "/_next/image?url=%2Fimages%2Fhome-en.webp&w=640&q=75",
    "/en?_rsc=test",
  ]) {
    const response = await request(path, {
      "x-middleware-subrequest":
        "middleware:middleware:middleware:middleware:middleware",
    });
    assert.equal(response.status, 401, path);
    assert.match(response.headers.get("x-robots-tag"), /noindex/);
  }
  assert.equal(
    (
      await request("/en", {
        Authorization: "Basic " + Buffer.from("botix:wrong").toString("base64"),
      })
    ).status,
    401,
  );
  const headers = {
    Authorization: "Basic " + Buffer.from(`botix:${secret}`).toString("base64"),
  };
  const page = await request("/fr", headers);
  assert.equal(page.status, 200);
  assert.match(page.headers.get("x-robots-tag"), /noindex/);
  assert.match(page.headers.get("cache-control"), /no-store/);
  const html = await page.text();
  if (build?.siteEnv === "preview")
    assert.ok(
      html.includes(`rel="canonical" href="${build.siteUrl}/fr"`),
      "Staging canonical uses build origin",
    );
  const asset = html.match(/src="([^"]*\/_next\/static\/[^"]+\.js)"/)?.[1];
  assert.ok(asset, "Built JS asset link");
  assert.equal((await request(asset)).status, 401);
  const script = await request(asset, headers);
  assert.equal(script.status, 200);
  assert.match(script.headers.get("x-robots-tag"), /noindex/);
  assert.match(script.headers.get("cache-control"), /no-store/);
  assert.equal((await request("/images/home-en.webp", headers)).status, 200);
  // Internal optimizer fetches cannot carry preview credentials.
  if (build?.siteEnv === "preview")
    assert.ok(
      !html.includes("/_next/image?"),
      "Preview uses authenticated originals",
    );
  const robots = await (await request("/robots.txt", headers)).text();
  assert.ok(robots.includes("Disallow: /"));
  assert.ok(!robots.includes("Sitemap:"));
  assert.equal(
    (await (await request("/api/inquiry", headers)).json()).available,
    false,
  );
});
await run(
  "preview",
  async () => {
    assert.equal((await request("/en")).status, 503);
  },
  "",
);
console.log(
  `Passed: ${build?.siteEnv === "preview" ? "staging artifact" : "production routes"}, preview access/noindex/assets/images, spoofed middleware header, disabled delivery and missing-secret fail-closed.`,
);
