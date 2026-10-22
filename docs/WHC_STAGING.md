# Protected WHC staging

Preparation only. No staging DNS, app or credentials are created by Phase 1E. Obtain authorization for the hostname and staging deployment first. Use synthetic data only. An example hostname below is a placeholder, not a DNS record to create automatically.

1. Confirm the remaining host checks in WHC_COMPATIBILITY.md. Reserve a separate app directory **outside every public document root**, a separate Node app, and a TLS hostname such as staging.botix.ca. Do not reuse metalfabricators.ca's app or restart its process. Keep public document root empty; disable directory listing. Confirm Passenger routes HTML, API, RSC, public images, /_next/static and /_next/image through authenticated application handling, or use host-wide authentication in front of every resource. Hosting that bypasses these protections is unsuitable for staging.
2. Provision TLS before transmitting Basic credentials. Set host-wide access restrictions, reject unrecognized Host values, disable shared/CDN caching, restrict direct origins and rate-limit authentication attempts. These controls are not installed by a Boolean env setting. Request provider assistance if the shared plan cannot implement them.
3. In a clean Linux checkout matching host architecture/libc and Node 24, use the approved source SHA and frozen pnpm 11.25.0 lockfile. No .env files or runtime secrets may be present at build time:

   ```sh
   pnpm install --frozen-lockfile
   SITE_ENV=preview SITE_URL=https://staging.botix.ca pnpm build:release
   pnpm package:release
   pnpm standalone:smoke
   ```

   Output: artifacts/botix-<sha>-preview-<build-id>, with traced modules, static/public assets, start.cjs, release.json and checksums. Read release.json: dirty must be false for a release candidate, and site URL/mode must match. Never deploy the local macOS validation bundle. Package hashes are integrity aids, not provenance signatures; keep artifact/archive digest in the approved release record.
4. Store a random secret of at least 32 characters in WHC's runtime environment controls. Do not paste secrets into command histories, GitHub, logs or chat. Use deploy/runtime.env.example as a names-only template; it deliberately has empty required fields. No secrets in NEXT_PUBLIC variables. Keep SITE_ENV=preview, INQUIRY_DELIVERY_ENABLED=false and TRUST_PROXY=false. Do not set webhook credentials. Build and runtime SITE_URL must match exactly. The recipe intentionally refuses live delivery.
5. If WHC confirms Passenger accepts the generated server through start.cjs, set that startup file and production Node mode. Verify how the selected adapter handles PORT/HOSTNAME before using it: preflight allows explicit IP bind addresses and numeric nonprivileged ports only. Do not weaken this validation to guess Passenger socket behavior. If unsupported, use the VPS/direct-service recipe after authorization. A successful start in another app is insufficient evidence.
6. Test without credentials: /en, /fr, /api/health, /api/inquiry, robots, sitemap, public image, real built JS, /_next/image and RSC requests must deny access, including spoofed x-middleware-subrequest headers. Test valid Basic username botix via a secure browser/secret-aware monitor: pages 200; noindex,nofollow,noarchive; private,no-store; robots Disallow: /; no live delivery. Missing/short secret must fail startup; app-level missing-secret behavior also fails closed. Check alternate hostnames, origin IP and cache HIT behavior; no bypass is acceptable.
7. Verify EN/FR canonicals/hreflang point to staging's build origin; root redirects to /en; all 144 routes, query filters, language context and authenticated original images work. No sitemap URL or robots directive may make staging indexable. After authentication the sitemap can still list staging URLs: access control/noindex are mandatory.
8. Run the Phase 1D four-width browser matrix, real keyboard/a11y/contrast checks and measured Web Vitals. Prior local browser access was denied by policy; no alternate browser is used to bypass that denial. Authorized remote staging is still uncreated, so those checks remain pending.
9. Test restart with synthetic in-flight requests and a 30-second drain allowance; observe resource usage without capturing query strings, headers, credentials or bodies. Perform backup restore into a separate location. Record date, exact artifact digest, provider configuration and results. /api/health is only liveness.

Do not promote a staging artifact by changing SITE_ENV at runtime: the startup guard rejects mode/origin mismatch. Rebuild the same approved source for production after go/no-go approval. Keep public copy free of pre-launch notices; staging access control is infrastructure, not marketing text.

### Protected preview image handling

Preview builds set Next images.unoptimized=true: the image optimizer’s internal source fetch does not carry Basic credentials and correctly receives 401. Authenticated original images are served in staging; all image paths remain access-controlled. Production builds keep optimization, verified by production HTTP smoke. Staging image transfer sizes/performance differ from production; measure production-equivalent performance only in an authorized host-protected environment with the production build. Do not relax proxy authentication for internal image requests.
