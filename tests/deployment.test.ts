import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
const { validate } = createRequire(import.meta.url)("../deploy/preflight.cjs");
const build = { siteUrl: "https://staging.example.test", siteEnv: "preview" };
const valid = {
  SITE_URL: build.siteUrl,
  SITE_ENV: "preview",
  PREVIEW_ACCESS_SECRET: "synthetic-preview-only-00000000000000",
  INQUIRY_DELIVERY_ENABLED: "false",
  TRUST_PROXY: "false",
  PORT: "3000",
  HOSTNAME: "127.0.0.1",
};
test("deployment preflight accepts protected preview with delivery disabled", () => {
  assert.deepEqual(validate(valid, build), []);
});
test("deployment preflight fails closed for unsafe/mismatched runtime settings", () => {
  for (const change of [
    { SITE_ENV: undefined },
    { SITE_ENV: "production" },
    { SITE_URL: "https://other.example.test" },
    { SITE_URL: "http://staging.example.test" },
    { SITE_URL: "https://user:secret@staging.example.test" },
    { PREVIEW_ACCESS_SECRET: "short" },
    { INQUIRY_DELIVERY_ENABLED: "true" },
    { INQUIRY_DELIVERY_ENABLED: undefined },
    { TRUST_PROXY: "true" },
    { PORT: "80" },
    { PORT: "3000oops" },
    { HOSTNAME: undefined },
    { NEXT_MANUAL_SIG_HANDLE: "true" },
  ])
    assert.ok(
      validate({ ...valid, ...change }, build).length > 0,
      JSON.stringify(Object.keys(change)),
    );
});
test("deployment diagnostics do not echo secrets", () => {
  const secret = "DO-NOT-PRINT-ME";
  assert.ok(
    !validate(
      {
        ...valid,
        SITE_URL: `https://user:${secret}@example.test`,
        PREVIEW_ACCESS_SECRET: secret,
      },
      build,
    )
      .join(" ")
      .includes(secret),
  );
});

test("release build rejects local env files and malformed origins before building", () => {
  const cwd = mkdtempSync(path.join(tmpdir(), "botix-build-guard-"));
  const script = fileURLToPath(
    new URL("../scripts/build-release.mjs", import.meta.url),
  );
  try {
    writeFileSync(
      path.join(cwd, ".env.local"),
      "SYNTHETIC_SECRET=never-print-this\n",
    );
    const env = {
      ...process.env,
      SITE_URL: "https://example.test",
      SITE_ENV: "preview",
    };
    const localFile = spawnSync(process.execPath, [script], {
      cwd,
      env,
      encoding: "utf8",
    });
    assert.notEqual(localFile.status, 0);
    assert.match(localFile.stderr, /without .env files/);
    assert.ok(!localFile.stderr.includes("never-print-this"));
    rmSync(path.join(cwd, ".env.local"));
    const invalid = spawnSync(process.execPath, [script], {
      cwd,
      env: { ...env, SITE_URL: "private-malformed-origin" },
      encoding: "utf8",
    });
    assert.notEqual(invalid.status, 0);
    assert.match(invalid.stderr, /explicit HTTPS origin/);
    assert.ok(!invalid.stderr.includes("private-malformed-origin"));
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});
