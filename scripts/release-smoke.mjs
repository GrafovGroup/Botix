// Isolated production and preview HTTP checks. No browser, deployment or receiver.
import { spawn } from "node:child_process";
import { once } from "node:events";
import assert from "node:assert/strict";
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
    [
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
        SITE_URL: "", // Preserve canonical fallback; same-origin POST uses the loopback Host.
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
    env: { ...process.env, TEST_URL: base },
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
  const asset = html.match(/src="([^"]*\/_next\/static\/[^"]+\.js)"/)?.[1];
  assert.ok(asset, "Built JS asset link");
  assert.equal((await request(asset)).status, 401);
  const script = await request(asset, headers);
  assert.equal(script.status, 200);
  assert.match(script.headers.get("x-robots-tag"), /noindex/);
  assert.match(script.headers.get("cache-control"), /no-store/);
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
  "Passed: health/security headers, production routes, preview access/noindex, spoofed middleware header, disabled delivery and missing-secret fail-closed.",
);
