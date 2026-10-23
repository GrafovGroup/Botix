# Authorized production deployment

Owner requested “make the site live” on 2026-10-22. Publish the existing bilingual BOTIX website at https://botix.ca on the WHC plan, retaining protected staging and other hosted sites.

Build a clean Linux x64 production release from the current implementation. Run tests, lint, type checks, dependency audit and standalone smoke checks. Preserve current public-root files for rollback, configure the production app and HTTPS canonical host, then verify public routes, assets, EN/FR metadata, security headers and desktop/mobile rendering.

Keep real inquiry delivery disabled until its receiver is separately configured and verified. Keep unverified phone links hidden and the safe typographic brand fallback. No PR merges, purchases or email DNS changes are included. Record actual deployment evidence; preparation alone is not deployment.

## Verified live deployment — 2026-10-22 (Toronto)

- Public website: https://botix.ca/en and https://botix.ca/fr. WHC app root: `botix-production/releases/93673ec63eaf`; public root: `/home/nvfglyl5/botix.ca`.
- Deployed source: `93673ec63eaf51497ae00b17a5657f6b84a66798`, clean Linux x64 production build, Node 24.21.0. Later documentation/acceptance-runner commits do not change this deployed application identity.
- Production workflow run `39883664056`, artifact `12471726738`: tests, launcher tests, catalogue checks, delivery tests, lint, full high-severity audit, build, typecheck, package and standalone 144-route smoke all passed.
- Archive SHA256: `c2a611786590e3343541fa586af40a2571ad11ba7f43291c741c92611cb01184`. All 2,181 packaged files verified on WHC; dependency symlinks stayed within the release.
- Public GET-only acceptance passed all 144 bilingual routes, canonical/hreflang, indexing rules, security headers, assets, optimized images, filters, localized 404s, root redirect and disabled inquiry delivery. The runner is `scripts/production-acceptance.mjs`; it ran successfully from WHC. A local network run encountered a socket disconnect and was not counted as passing.
- HTTP and www redirect permanently to HTTPS botix.ca while preserving paths. Both hostnames have trusted TLS. Anonymous staging remains 401 with noindex and private/no-store. No email or DNS records changed.
- Browser inspection: live English desktop at 1440px, mobile at 390px, keyboard-operated mobile menu and English-to-French navigation; loaded hero image and no horizontal page overflow. French mobile content inspected. These are focused launch checks, not a full accessibility/performance certification.
- Production launcher `deploy/whc-production-launcher.py` installed privately at `/home/nvfglyl5/botix-production/whc-node-launcher.py`, mode 0700; PassengerNodejs points to it. It passes environment values directly to Node without shell evaluation. cPanel app saves may overwrite PassengerNodejs; recheck after configuration changes.
- Previous public root preserved in `/home/nvfglyl5/botix-production/rollback/before-launch`; initial app htaccess preserved as `rollback/created-app.htaccess`. For rollback, stop only the production app and restore its public-root mapping/files from that backup, keeping staging and unrelated apps untouched. No destructive restore drill was performed on the live site.

The initial archive attempt was correctly refused because Python tests produced untracked bytecode before the manifest was generated. The production workflow now runs those tests with `-B`; the clean replacement artifact above passed.

## Remaining operational work

Real inquiry delivery remains disabled; customers can prepare and download briefs. Receiver selection, secure credentials and explicit delivery enablement are separate. Unverified phone remains hidden; approved vector artwork can replace the typographic fallback when supplied. Stacked PRs remain unmerged. No legal clearance, supplier authorization, stock, service capacity or phone verification is inferred from launch authorization.
