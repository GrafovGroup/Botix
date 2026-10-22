import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  stagingTarget,
  sameOriginPath,
} from "../scripts/staging-acceptance.mjs";
test("staging acceptance restricts credentials to loopback or explicitly authorized staging", () => {
  assert.equal(stagingTarget("http://127.0.0.1:3097"), "http://127.0.0.1:3097");
  assert.equal(
    stagingTarget("https://staging.botix.ca", true),
    "https://staging.botix.ca",
  );
  for (const url of [
    "https://botix.ca",
    "https://www.botix.ca",
    "https://attacker.test",
    "http://staging.botix.ca",
    "https://staging.botix.ca:444",
    "https://user:secret@staging.botix.ca",
    "https://staging.botix.ca/path",
    "https://staging.botix.ca?token=private",
  ])
    assert.throws(() => stagingTarget(url, true));
  assert.throws(() => stagingTarget("https://staging.botix.ca"));
});
test("resource paths cannot redirect acceptance credentials across origins", () => {
  const origin = "https://staging.botix.ca";
  assert.equal(
    sameOriginPath("/en?type=humanoid", origin),
    "/en?type=humanoid",
  );
  for (const resource of [
    "//evil.test/x.js",
    "https://evil.test",
    "http://staging.botix.ca",
    "https://user:pass@staging.botix.ca",
  ])
    assert.throws(() => sameOriginPath(resource, origin));
});

test("staging archive refuses macOS, dirty, production or wrong-host artifacts", () => {
  const cwd = mkdtempSync(path.join(tmpdir(), "botix-archive-guard-"));
  const directory = path.join(cwd, "candidate");
  const script = fileURLToPath(
    new URL("../scripts/archive-staging.mjs", import.meta.url),
  );
  mkdirSync(directory);
  mkdirSync(path.join(cwd, "artifacts"));
  writeFileSync(
    path.join(cwd, "artifacts/latest.json"),
    JSON.stringify({ directory }),
  );
  const valid = {
    platform: "linux",
    arch: "x64",
    dirty: false,
    siteEnv: "preview",
    siteUrl: "https://staging.botix.ca",
  };
  try {
    for (const change of [
      { platform: "darwin" },
      { dirty: true },
      { siteEnv: "production" },
      { siteUrl: "https://botix.ca" },
      { arch: "arm64" },
    ]) {
      writeFileSync(
        path.join(directory, "release.json"),
        JSON.stringify({ ...valid, ...change }),
      );
      const result = spawnSync(process.execPath, [script], {
        cwd,
        encoding: "utf8",
      });
      assert.notEqual(result.status, 0);
      assert.match(result.stderr, /requires clean Linux x64 preview build/);
    }
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});
