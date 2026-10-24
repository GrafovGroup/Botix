// Local lab measurements only: no live traffic, analytics or inquiries.
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const origin = process.env.TEST_URL || "http://127.0.0.1:3004";
assert.match(origin, /^http:\/\/127\.0\.0\.1:\d+$/);
const browser = await chromium.launch({
  ...(process.env.CHROMIUM_PATH
    ? { executablePath: process.env.CHROMIUM_PATH }
    : {}),
});
const measurements = [];
try {
  for (const [device, viewport] of [
    ["desktop", { width: 1440, height: 1000 }],
    ["mobile", { width: 390, height: 844 }],
  ]) {
    const context = await browser.newContext({
      viewport,
      reducedMotion: "reduce",
    });
    await context.addInitScript(() => {
      window.botixLab = { lcp: null, cls: 0 };
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries())
          window.botixLab.lcp = entry.startTime;
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) window.botixLab.cls += entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
    });
    for (const locale of ["en", "fr"]) {
      for (const route of [
        "",
        "humanoid-robots",
        "robots",
        "products/unitree-g1",
        "locations/cities/toronto-gta",
        "request-quote",
      ]) {
        const page = await context.newPage();
        const path = `/${locale}${route ? "/" + route : ""}`;
        const response = await page.goto(origin + path, {
          waitUntil: "networkidle",
        });
        assert.equal(response.status(), 200, path);
        const metrics = await page.evaluate(() => {
          const navigation = performance.getEntriesByType("navigation")[0];
          return {
            lcpMs: window.botixLab.lcp,
            cls: window.botixLab.cls,
            ttfbMs: navigation.responseStart - navigation.requestStart,
            domContentLoadedMs: navigation.domContentLoadedEventEnd,
          };
        });
        measurements.push({ device, path, ...metrics });
        await page.close();
      }
    }
    await context.close();
  }
} finally {
  await browser.close();
}
assert.equal(measurements.length, 24);
assert.ok(
  measurements.every((m) => Number.isFinite(m.lcpMs) && Number.isFinite(m.cls)),
);
await mkdir("artifacts/browser", { recursive: true });
const result = {
  measuredAt: new Date().toISOString(),
  scope:
    "Local Chromium lab, loopback production server, unthrottled CPU/network, reduced motion. Not field Core Web Vitals or live-site acceptance.",
  measurements,
};
await writeFile(
  "artifacts/browser/performance.json",
  JSON.stringify(result, null, 2) + "\n",
);
console.log(
  JSON.stringify({
    pages: measurements.length,
    maxLcpMs: Math.max(...measurements.map((m) => m.lcpMs)),
    maxCls: Math.max(...measurements.map((m) => m.cls)),
    evidence: "artifacts/browser/performance.json",
  }),
);
