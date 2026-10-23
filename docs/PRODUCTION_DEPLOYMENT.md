# Authorized production deployment

Owner requested “make the site live” on 2026-10-22. Publish the existing bilingual BOTIX website at https://botix.ca on the WHC plan, retaining protected staging and other hosted sites.

Build a clean Linux x64 production release from the current implementation. Run tests, lint, type checks, dependency audit and standalone smoke checks. Preserve current public-root files for rollback, configure the production app and HTTPS canonical host, then verify public routes, assets, EN/FR metadata, security headers and desktop/mobile rendering.

Keep real inquiry delivery disabled until its receiver is separately configured and verified. Keep unverified phone links hidden and the safe typographic brand fallback. No PR merges, purchases or email DNS changes are included. Record actual deployment evidence; preparation alone is not deployment.
