import {
  cp,
  mkdir,
  readFile,
  readdir,
  lstat,
  realpath,
  writeFile,
} from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
const build = JSON.parse(await readFile(".next/botix-build.json", "utf8"));
const id = (await readFile(".next/BUILD_ID", "utf8")).trim();
if (!/^[\w-]+$/.test(id) || !/^[a-f0-9]{40}$/.test(build.sourceSha))
  throw new Error("Invalid build identity");
if (id !== build.buildId)
  throw new Error("Stale build metadata; rerun build:release");
const root = path.resolve(
  `artifacts/botix-${build.sourceSha.slice(0, 12)}-${build.siteEnv}-${id}`,
);
await mkdir("artifacts", { recursive: true });
// Never overwrite a prior candidate or rollback artifact.
await mkdir(root);
await cp(".next/standalone", root, { recursive: true, verbatimSymlinks: true });
await cp(".next/static", path.join(root, ".next/static"), { recursive: true });
await cp("public", path.join(root, "public"), { recursive: true });
for (const file of ["start.cjs", "preflight.cjs"])
  await cp(`deploy/${file}`, path.join(root, file));
await writeFile(
  path.join(root, "release.json"),
  JSON.stringify({ ...build, buildId: id }, null, 2) + "\n",
);
const hashes = {};
async function scan(dir) {
  for (const name of (await readdir(dir)).sort()) {
    const file = path.join(dir, name);
    const rel = path.relative(root, file);
    if (/^\.env(?:\.|$)/.test(name) || /\.(pem|key)$/.test(name))
      throw new Error("Forbidden secret file in release; discard candidate");
    const stat = await lstat(file);
    if (stat.isSymbolicLink()) {
      const target = await realpath(file);
      if (!target.startsWith(root + path.sep))
        throw new Error("Non-relocatable dependency link in artifact");
    } else if (stat.isDirectory()) await scan(file);
    else
      hashes[rel] = createHash("sha256")
        .update(await readFile(file))
        .digest("hex");
  }
}
await scan(root);
await writeFile(
  path.join(root, "SHA256SUMS.json"),
  JSON.stringify(hashes, null, 2) + "\n",
);
await writeFile(
  "artifacts/latest.json",
  JSON.stringify({ directory: root }) + "\n",
);
console.log(`Packaged ${Object.keys(hashes).length} files: ${root}`);
