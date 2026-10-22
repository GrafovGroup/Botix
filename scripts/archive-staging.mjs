import { readFile, writeFile, open } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import path from "node:path";
const { directory } = JSON.parse(
  await readFile("artifacts/latest.json", "utf8"),
);
const release = JSON.parse(
  await readFile(path.join(directory, "release.json"), "utf8"),
);
if (
  release.platform !== "linux" ||
  release.arch !== "x64" ||
  release.dirty !== false ||
  release.siteEnv !== "preview" ||
  release.siteUrl !== "https://staging.botix.ca"
)
  throw new Error(
    "Staging archive requires clean Linux x64 preview build for staging.botix.ca",
  );
const output = `artifacts/botix-staging-${release.sourceSha}.tar.gz`;
// Exclusive reservation: never silently replace an approved archive.
await (await open(output, "wx", 0o600)).close();
execFileSync("tar", ["-czf", output, "-C", directory, "."]);
const digest = createHash("sha256")
  .update(await readFile(output))
  .digest("hex");
await writeFile(output + ".sha256", `${digest}  ${path.basename(output)}\n`, {
  flag: "wx",
});
console.log(
  "Linux staging archive and SHA256 created; upload/deployment still requires owner approval.",
);
