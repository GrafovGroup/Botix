/* eslint-disable @typescript-eslint/no-require-imports -- cPanel startup entrypoint is CommonJS. */
const { validate } = require("./preflight.cjs");
const build = require("./release.json");
const errors = validate(process.env, build);
if (build.platform !== process.platform || build.arch !== process.arch)
  errors.push("Artifact platform/architecture mismatch; rebuild for this host");
if (errors.length) {
  console.error("BOTIX startup refused: " + errors.join("; "));
  process.exit(1);
}
process.env.NODE_ENV = "production";
// Same process, so SIGTERM reaches Next.js without a shell/child forwarding gap.
require("./server.js");
