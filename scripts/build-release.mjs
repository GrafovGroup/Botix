import { readdir, readFile, writeFile } from "node:fs/promises";
import { spawnSync, execFileSync } from "node:child_process";
import { validate } from "../deploy/preflight.cjs";
const envFiles = (await readdir(".")).filter(
  (n) => n.startsWith(".env") && n !== ".env.example",
);
if (envFiles.length)
  throw new Error(
    "Build in a clean checkout without .env files; use exported build settings only",
  );
let siteUrl;
try {
  siteUrl = new URL(process.env.SITE_URL).origin;
} catch {
  throw new Error("SITE_URL must be an explicit HTTPS origin");
}
const siteEnv = process.env.SITE_ENV;
const errors = validate(
  {
    ...process.env,
    PORT: "3097",
    HOSTNAME: "127.0.0.1",
    PREVIEW_ACCESS_SECRET: "synthetic-build-validation-only-00000",
    INQUIRY_DELIVERY_ENABLED: "false",
    TRUST_PROXY: "false",
  },
  { siteUrl, siteEnv },
);
if (errors.length) throw new Error(errors.join("; "));
for (const name of [
  "INQUIRY_WEBHOOK_SECRET",
  "INQUIRY_SIGNING_SECRET",
  "PREVIEW_ACCESS_SECRET",
  "INQUIRY_WEBHOOK_URL",
]) {
  if (process.env[name])
    throw new Error(
      "Do not provide runtime secrets or receiver configuration to the build",
    );
}
if (
  process.env.NEXT_PUBLIC_PHONE_VERIFIED === "true" ||
  process.env.ENABLE_HSTS === "true"
)
  throw new Error(
    "Phase 1E artifacts keep phone verification and HSTS disabled",
  );
const result = spawnSync(
  process.execPath,
  ["node_modules/next/dist/bin/next", "build"],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      NODE_ENV: "production",
      INQUIRY_DELIVERY_ENABLED: "false",
      TRUST_PROXY: "false",
      NEXT_PUBLIC_PHONE_VERIFIED: "false",
      ENABLE_HSTS: "false",
    },
  },
);
if (result.status !== 0) process.exit(result.status || 1);
await writeFile(
  ".next/botix-build.json",
  JSON.stringify(
    {
      sourceSha: execFileSync("git", ["rev-parse", "HEAD"], {
        encoding: "utf8",
      }).trim(),
      dirty: Boolean(
        execFileSync("git", ["status", "--porcelain"], {
          encoding: "utf8",
        }).trim(),
      ),
      siteUrl,
      siteEnv,
      platform: process.platform,
      arch: process.arch,
      node: process.version,
      builtAt: new Date().toISOString(),
      buildId: (await readFile(".next/BUILD_ID", "utf8")).trim(),
    },
    null,
    2,
  ) + "\n",
);
