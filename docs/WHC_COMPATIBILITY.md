# WHC compatibility decision — 2026-10-22

Decision: retain the owner's WHC Web Hosting Pro plan as the **conditional staging candidate**. Do not declare production compatibility until the actual BOTIX artifact passes host tests. No hosting purchase is needed to conduct those authorized tests later. Live inquiry delivery is unsupported on the current evidence, and remains disabled.

## Evidence from the owner's authenticated panels

- WHC service: WEB PRO / Web Hosting Pro, primary domain metalfabricators.ca.
- cPanel 134.0.61 on srv48.swhc.ca exposes Setup Node.js App, Application Manager, Terminal, SSH Access, Git Version Control and JetBackup 5.
- CloudLinux Node selector shows existing applications running Node 22.23.3 and 24.21.0. This confirms available runtimes, not BOTIX compatibility or capacity.
- WHC advertises SFTP/SSH port 27; successful shell login and shell capabilities have **not** been tested. No keys/passwords copied to the repository.
- cPanel account limits displayed: 1.54 GB physical memory, 200 processes, 50 entry processes, 300,000 inodes, 1 CPU (100%), 8 MB/s I/O. Other sites share these quotas. A build should run on matching Linux CI, not consume the production account's limited RAM.
- Under earlier, explicit owner domain authorization, botix.ca was added to a separate document root and assigned ns1.whc.ca/ns2.whc.ca/ns3.whc.ca. Hosting A record is 51.161.57.68; www is a CNAME to botix.ca. Public recursive DNS still returned cached Spaceship records when Phase 1E began. No additional DNS change is part of 1E.
- No BOTIX process, TLS certificate, restart behavior, ingress rules, logging configuration, backup restore or direct-origin restriction has been verified on WHC.

## Runtime inventory

Next 16.4.2 / React 19.3.1, Node >=20.9; prefer verified Node 24.21.0 on WHC and matching Linux build ABI/architecture. pnpm 11.25.0 is a build tool; the packaged standalone server needs only Node and its traced modules. Native sharp/image dependencies must match target OS, architecture and libc. A macOS package is local evidence only and must not be uploaded to Linux.

App Router SSR and dynamic catalogue queries, /api/inquiry GET/POST, /api/health, proxy authentication and image optimization require a long-running Node process. Static export is not supported. Writable .next/cache (including image cache), runtime temp space and adequate disk are required; no local lead database exists. Keep application code outside a web-served document root. Only Next.js may serve application/static/image routes in preview, unless the host enforces equivalent authentication on every path. Never let Apache serve the packaged source, manifests or node_modules.

Build settings include SITE_URL, SITE_ENV, NEXT_PUBLIC_PHONE_VERIFIED and ENABLE_HSTS. Server secrets must be supplied at runtime. Canonicals can be prerendered, so a different staging origin requires its own build. One-process local rate limits are insufficient for live delivery on shared/multiple/restarted workers. Preserve TRUST_PROXY=false until actual overwritten headers and origin isolation are demonstrated.

## Decision tree

| Option | Verified evidence | Remaining conditions | Decision |
| --- | --- | --- | --- |
| WHC shared cPanel Node/Passenger | Selected plan, Node 22/24 applications, shell controls and quotas visible | Validate generated standalone server/start.cjs under Passenger, port/socket interception, env injection, drain/restart, static authentication, writable cache, memory and SSL | Preferred staging candidate; not yet production validated |
| WHC managed/unmanaged VPS | No VPS purchased or inspected | Node 24, Linux architecture/libc, non-root service, reverse proxy, firewall, shared rate limiting, backups, patching and on-call ownership | Conditional alternative if shared hosting cannot meet requirements; purchase needs owner decision |
| WHC domain with external Node runtime | DNS control verified; no external runtime selected | Canadian data processing/retention review, secrets, HTTPS, ingress, costs, runtime support | Contingency; owner chooses provider, no transfer required |

**Do not bypass incompatibility with a static export, permissive CORS, disabled auth, trusted client headers or an unsupervised background process.** Passenger can have different startup conventions than a plain Node service. Confirm with the account's Node selector/WHC before choosing a startup file; the provided start.cjs recipe is tested as a directly supervised Node process only.

## Minimal remaining owner/host verification

Plan name, Node capability/version and DNS access are already verified. Remaining: approve a staging hostname and test deployment; verify shell login, Linux ABI/architecture, Passenger startup requirements and restart/drain behavior, resource headroom, SSL, private origins/headers/shared request limits, logging retention, and backup restore. Ask WHC for unavailable controls only after an authorized account test. Until then, live delivery is unsupported on this shared plan.

### Protected preview image handling

Preview builds set Next images.unoptimized=true: the image optimizer’s internal source fetch does not carry Basic credentials and correctly receives 401. Authenticated original images are served in staging; all image paths remain access-controlled. Production builds keep optimization, verified by production HTTP smoke. Staging image transfer sizes/performance differ from production; measure production-equivalent performance only in an authorized host-protected environment with the production build. Do not relax proxy authentication for internal image requests.
