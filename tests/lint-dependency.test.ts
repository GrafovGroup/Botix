import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdtempSync, mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { ESLint } from "eslint";

const require = createRequire(path.join(process.cwd(), "package.json"));
const configRequire = createRequire(require.resolve("eslint-config-next"));
const pluginPath = configRequire.resolve("@next/eslint-plugin-next");
const pluginRequire = createRequire(pluginPath);
const { getRootDirs } = pluginRequire("./utils/get-root-dirs.js");

test("Next lint root discovery preserves default, directory, wildcard and array settings", () => {
  const cwd = mkdtempSync(path.join(tmpdir(), "botix-lint-"));
  for (const name of ["one", "two"])
    mkdirSync(path.join(cwd, "apps", name), { recursive: true });
  const context = (rootDir?: unknown) => ({
    cwd,
    settings: { next: { rootDir } },
  });
  try {
    assert.deepEqual(getRootDirs(context()), [cwd]);
    assert.deepEqual(getRootDirs(context(path.join(cwd, "apps/one"))), [
      path.join(cwd, "apps/one"),
    ]);
    const expected = ["one", "two"]
      .map((n) => path.join(cwd, "apps", n))
      .sort();
    assert.deepEqual(
      getRootDirs(context(path.join(cwd, "apps/*"))).sort(),
      expected,
    );
    assert.deepEqual(
      getRootDirs(
        context([path.join(cwd, "apps/one"), path.join(cwd, "apps/two"), null]),
      ).sort(),
      expected,
    );
    assert.deepEqual(
      getRootDirs(context(path.join(cwd, "apps/{one,two}"))).sort(),
      expected,
    );
    const relative = path.relative(process.cwd(), path.join(cwd, "apps"));
    assert.deepEqual(
      getRootDirs(context(relative + "/*")).sort(),
      [relative + "/one", relative + "/two"].sort(),
    );
    assert.deepEqual(getRootDirs(context(path.join(cwd, "absent/*"))), []);
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});

test("Next lint rules remain enabled after the scoped glob replacement", async () => {
  const eslint = new ESLint();
  const [result] = await eslint.lintText(
    'export default function Example() { return <img src="/test.png" alt="Example" />; }',
    { filePath: "src/app/lint-check.tsx" },
  );
  assert.ok(
    result.messages.some((m) => m.ruleId === "@next/next/no-img-element"),
  );
});
