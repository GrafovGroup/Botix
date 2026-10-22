# WHC release and rollback procedure

No deployment automation, SSH credential or production workflow is added. The manual steps below are conditional on exact-release owner approval, host validation and GO_NO_GO.md. Earlier domain connection authorization did not authorize app deployment, merge, staging DNS or live delivery. Read WHC_COMPATIBILITY.md and WHC_STAGING.md first.

## Build and artifact

Use a clean checkout of the approved SHA on Linux matching WHC's verified architecture/libc. Use Node 24 and pnpm 11.25.0. Run tests, catalogue, synthetic delivery, lint, build, types and both smoke harnesses. The normal build also emits standalone output; build:release additionally refuses .env files/runtime secrets and writes build identity. package:release requires that identity, copies public and .next/static, checks dependency links remain inside the artifact and rejects secret filenames. It never overwrites an artifact directory. This is not a general secret scanner: do not embed secrets in source, public files or arbitrary build variables.

```sh
pnpm install --frozen-lockfile
pnpm test
pnpm catalog:check
pnpm delivery:test
pnpm lint
SITE_ENV=production SITE_URL=https://botix.ca pnpm build:release
pnpm typecheck
pnpm release:smoke
pnpm package:release
pnpm standalone:smoke
pnpm audit --prod --audit-level=high
pnpm audit --audit-level=high
```

The smoke commands start loopback-only processes, clear receiver secrets and never send external leads. standalone:smoke reads release.json and validates packaged start.cjs in the artifact’s build mode. A separately built preview artifact tests the actual staging entrypoint and canonical origin. Cross-mode and missing-secret probes directly run generated server.js to test application guards independently of the startup guard. Runtime validation has separate unit tests. Staging builds need their own HTTPS origin/mode and host acceptance; the production harness expects botix.ca metadata; preview artifacts use their own manifest origin.

Check release.json sourceSha, dirty=false, buildId, mode, siteUrl, OS/architecture/Node. Packaging alone does not certify a clean source tree, freshness or authorization: run build and package together from the immutable clean checkout. SHA256SUMS.json records copied regular-file hashes; an outer archive SHA256 protects the manifest and symlink structure in transit. Preserve symlinks when archiving/extracting and verify they remain internal. Keep the deployment archive private; never publish its source/modules as static downloads. Native modules require a matching target; no macOS-to-Linux promotion.

CI builds and tests on Linux with pinned Actions, no app secrets and contents-read permissions. It does not upload or deploy artifacts. The separate full dependency audit remains unsuppressed. Local and GitHub CI outcomes must be recorded separately.

## Start and supervision

For a verified VPS/direct supervisor, inject environment values from a restricted external secret store, then run from the artifact directory:

```sh
node start.cjs
```

Use a dedicated non-root account, restart-on-failure with bounded backoff, a restrictive umask, writable .next/cache/temp space, and private loopback PORT=3000/HOSTNAME=127.0.0.1 behind TLS ingress. Do not expose PORT publicly. No environment file ships in the artifact. Configure the supervisor's working directory to this release. An intentional public container bind (0.0.0.0/::) requires network isolation/firewall and must not bypass ingress. start.cjs runs Next in the same process so SIGTERM is delivered directly. Do not enable NEXT_MANUAL_SIG_HANDLE. Allow at least 30 seconds to drain before a forced stop; verify this under actual load. Secrets are not logged by the preflight.

For WHC shared hosting, use Node selector only after confirming Passenger supports this exact entrypoint/bind contract and proxy behavior. Do not start a permanent process via Terminal/nohup or alter other apps. If incompatible, record the failure and use the VPS/external-runtime decision tree. Passenger restart controls and drainage are host acceptance items, not locally proven capabilities.

## Ingress and live delivery

Require TLS, canonical host redirects, request/body/time limits, auth rate limiting and shared inquiry rate limits at trusted ingress. Verify hostile X-Forwarded-For is overwritten, permitted proxy chain handling is precise, and origins cannot bypass the edge. TRUST_PROXY=false and delivery=false remain mandatory in this recipe even if operator attestations are accidentally set. Enabling live delivery is a separate reviewed change after CRM, consent, privacy, retention and synthetic E2E acceptance. No customer PII in access logs, query logs, request bodies or artifacts. Aggregate status/timing monitoring only; audit the hosting platform's own defaults.

## DNS and email coexistence

Earlier authorized domain setup: hosting nameservers ns1/ns2/ns3.whc.ca; A botix.ca=51.161.57.68; www CNAME=botix.ca, TTL 14400 observed. Registrar previously used WHC parking nameservers; those served parking A=149.56.225.6 and MX priority 1 emailfwd.botix.ca; WHC showed zero forwarding rules. New cPanel zone initially generated MX priority 0 botix.ca, mail CNAME, DKIM, SPF and DMARC defaults. These are a dated observation, not proof of working email; no mailbox or receiver was configured. Existing metalfabricators.ca records were not changed.

Before any future web/DNS change, export the **currently authoritative** complete zone with TTLs and delegation/DNSSEC status. Preserve MX, SPF, DKIM selectors, DMARC, mail host A/AAAA and verification TXT records exactly unless the owner separately authorizes email work. A change to an apex A used by MX or SPF +a can alter email routing/authentication even if MX/TXT remain unchanged; decouple mail to a verified dedicated host first if necessary. Resolve incompatible AAAA/CAA records intentionally. Changing nameservers requires copying the full zone and matching DNSSEC DS state, not only web records. Never guess records from examples or reset a zone. Domain setup is distinct from app deployment; public DNS propagation and certificate validation must be rechecked before release.

## Release, backup and rollback

Record approved SHA/artifact digest, operator/date, source PR dependencies, runtime configuration revision (secret names only), DNS snapshot, TLS expiry, backup/retention and previous artifact path. Back up host/app configuration and verify a restore outside live folders. Upload into a new private versioned directory without overwriting the last good release; verify archive digest and unpack permissions. Start/health-check separately before switching the approved app mapping. Do not expose an unprotected build during the switch. Preserve prior hashed assets for clients or use a verified atomic traffic switch. Recheck HTTPS, EN/FR routes, metadata, API unavailable behavior, preview protection, image transform, headers and error rates.

For failure: stop traffic to the new process, keep delivery disabled, restore the prior approved mapping/artifact/environment through the verified supervisor, drain failed workers, repeat checks and retain sanitized incident evidence. Do not change signing secrets casually or delete receiver records. DNS rollback is only needed if DNS changed and separately authorized; it is not an instant app rollback. Assign monitoring owner/alerts for health, 5xx/429, TLS, memory, disk/inodes and backup failure before production approval.

### Protected preview image handling

Preview builds set Next images.unoptimized=true: the image optimizer’s internal source fetch does not carry Basic credentials and correctly receives 401. Authenticated original images are served in staging; all image paths remain access-controlled. Production builds keep optimization, verified by production HTTP smoke. Staging image transfer sizes/performance differ from production; measure production-equivalent performance only in an authorized host-protected environment with the production build. Do not relax proxy authentication for internal image requests.
