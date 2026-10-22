# Phase 1E verification — 2026-10-22

Environment: local macOS, Node 24.19.0, pnpm 11.25.0, Next 16.4.2. No remote deployment or lead delivery. Local artifacts are for verification only; WHC requires a matching Linux artifact.

- Unit tests: **35 passed**, including startup refusals and build-env/diagnostic redaction tests.
- Catalogue: **6 products / 5 manufacturers passed**. Synthetic persisted receiver acceptance/deduplication/conflict/failure checks passed without external network.
- ESLint, TypeScript and production standalone build passed.
- Source and packaged production HTTP harnesses: **144 bilingual routes / 144 unique internal links passed**, metadata/hreflang/canonicals, 404/root redirect, image optimization, filters/French search, query/rental context, phone exclusion and seven inquiry cases.
- Packaged startup with representative non-secret production env passed. Preview auth/noindex/private-no-store for page/API/RSC/real JS/public image paths, hostile middleware header denial, disabled delivery and app-level missing-secret 503 passed. Unit preflight verifies missing preview credentials refuse startup entirely.
- Separate preview-origin artifact: **passed** startup through start.cjs, staging canonical origin, authenticated original images/JS, noindex/private-no-store, disabled delivery and missing-secret denial.
- Production dependency audit: **0 reported vulnerabilities**. Full audit: **1 high development-only braces finding**, GHSA-vfj7-8cjw-p6xm, no patched version reported. No suppression; separate CI audit job remains.
- Whitespace review passed. Independent source review identified the initial missing preview-artifact test; corrected by manifest-driven harness and separate preview CI build. Documentation review corrected stale build/runtime and domain-authorization wording.

## Defects found and fixed during verification

Protected preview image optimization initially returned 401 because the optimizer's internal source fetch lacks Basic credentials. Preview builds now serve authenticated original images with images.unoptimized=true; production retains tested optimization. No auth bypass was added. Original-image transfer sizes differ, so staging is not production image-performance evidence.

The package guard rejected stale build metadata during development; rebuild generated matching identity. Artifact packaging records dirty status and refuses overwrite, wrong build identity, secret filenames or dependency links outside the package. Clean source and immutable commit remain operator release requirements, not inferred from a local smoke pass.

## Limits

No BOTIX Passenger runtime, TLS, reverse-proxy trust, shared rate limiting, direct-origin isolation, actual in-flight drain, host backup restore or capacity/load test yet. cPanel capability evidence is not deployment acceptance. Existing local browser access policy denial is preserved; no bypass or fabricated screenshot/a11y/Web Vitals result. No new images or public brand claims. Linux CI results must be read separately after publication; a local pass is not a GitHub pass. No source merge, app deployment, new DNS change, purchase or lead activation in 1E.
