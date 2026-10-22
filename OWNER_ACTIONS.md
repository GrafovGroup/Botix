# Current staging dependencies — 2026-10-22

Staging is already authorized; no repeated approval is needed. The execution attempt is blocked by an unpatched high dependency advisory and untrusted staging TLS. A reviewed dependency remediation must pass the full audit, and WHC must issue a valid certificate before a protected artifact is uploaded. Existing supported dependency upgrades do not remove braces. See docs/WHC_STAGING_ACCEPTANCE.md for exact evidence and remaining host checks. No purchase or production release is requested. Earlier approval requests below are historical.

# Phase 1F approval boundary

Review docs/WHC_STAGING_ACCEPTANCE.md and the stacked Phase 1F PR. Explicit authorization is required for staging.botix.ca creation/DNS, isolated WHC app and TLS configuration, Linux candidate upload and staging-only acceptance tests. The brief explicitly excludes these from a generic request to continue phases. Full dependency audit must pass before the proposed candidate workflow publishes an artifact. Passenger/port compatibility, Linux libc/architecture, host-wide protection, restart/drain, capacity, logs, backup restore and browser acceptance remain unverified. Production/apex/www/mail changes, live inquiries, merges and purchases remain outside approval scope.

# Phase 1E hosting update — 2026-10-22

WHC Web Hosting Pro, cPanel Node 24 capability and domain control are verified. Domain attachment and hosting nameservers were configured under the earlier owner request. Remaining: authorize a staging hostname/deployment; verify SSH access, Passenger startup/drain, Linux architecture/libc, shared resource headroom, TLS, private-origin/header controls, shared rate limits, log retention and restore. No new hosting purchase requested. Existing phone, brand, privacy/legal/receiver and real-browser gates below remain. See docs/WHC_COMPATIBILITY.md.

# Owner actions

1. **Lead destination:** choose the receiving CRM/email workflow and configure its HTTPS endpoint and bearer secret. Confirm durable acceptance, deduplication, retention and access controls. Set a stable inquiry signing secret and shared edge rate limiting for the chosen deployment.
2. **Phone:** confirm that the supplied standard placeholder `(833) 696-9996` routes to BOTIX, or provide the project-specific number. Phase 1C hides the number in links and structured data until NEXT_PUBLIC_PHONE_VERIFIED=true with a verified number and a rebuild.
3. **Brand:** supply the approved Signature vector logo files and approve the original humanoid imagery. The repository contained no `public/brand/` assets despite the initial README reference.
4. **Business/legal particulars:** confirm legal operating entity, privacy contact, actual hosting/delivery providers, retention period and any cross-border processing. Obtain counsel review of the English/French privacy and terms copy. No public “legal review” or pre-launch notices are present.
5. **Verified catalog:** review the six sourced editorial examples and supply any confirmed supplier relationships, inventory, rental availability and licensed product media. Published references do not assert BOTIX dealership or availability; no online transactions are enabled.
6. **Trademark:** obtain BOTIX name/mark clearance and approved usage guidance; no clearance is claimed.
7. **Visual acceptance:** complete desktop/tablet/mobile browser checks from docs/PHASE_1C_QA.md; policy blocked implementation-time browser access.
8. **Publication:** WHC selected and domain connection completed under earlier authorization. Validate BOTIX hosting and authorize app deployment separately; no production app is deployed.

Image duplicate screening covered 2,108 locally available images across 10 other project directories. The closest perceptual matches were visually inspected and are unrelated scenes. Remote-only and otherwise unavailable inventories remain outside scope; no complete portfolio-wide verification is claimed.

Privacy review reference: [Office of the Privacy Commissioner of Canada — Privacy Guide for Businesses](https://www.priv.gc.ca/media/2038/guide_org_e.pdf). Counsel should align the final notices with the actual entity, providers, practices and applicable provincial rules; this implementation does not claim legal compliance certification.

Use docs/LAUNCH_CHECKLIST.md for the full owner signoff, receiver verification, deployment, monitoring and rollback sequence. Delivery defaults disabled; production requires explicit receiver/shared-edge attestations as well as secrets. Brand handoff requirements are in docs/BRAND_ASSETS.md.

Phase 1D/1E: WHC selected; verify hosting and validate preview/HTTPS/CDN/origin controls; address the development-only braces advisory with owner/security review; complete the 375/768/1024/1440 browser matrix and actual bilingual receiver plan. Production remains NO-GO under docs/GO_NO_GO.md. CI is added, but a workflow file or local pass is not evidence that a GitHub-hosted run passed.
