# BOTIX WHC Staging — Owner Authorization
Date: 2026-10-22
Status: AUTHORIZED FOR STAGING ONLY

The owner explicitly confirmed in the BOTIX project conversation: "Authorized already", in response to the request to authorize creation and deployment of a password-protected staging website at staging.botix.ca on the existing WHC Web Hosting Pro account.

## Authorized scope
- Create a new isolated staging.botix.ca subdomain and required staging-only DNS record if not conflicting with existing records.
- Configure valid TLS, host-level password protection, noindex, and staging-only Node.js application.
- Prepare and upload a verified Linux staging artifact after required security/compatibility checks pass.
- Perform staging-only synthetic acceptance checks and reversible startup/restart tests.
- Record evidence and rollback details, without exposing secrets.

## Not authorized
- Production launch, modifications to apex/www botix.ca, MX/SPF/DKIM/DMARC or other domains/apps.
- Enabling real inquiry delivery, real customer-data transmission, buying plans/services, force-push, unreviewed branch merges or unsafe security bypasses.
- Publishing a staging application without effective HTTPS/authentication.
- Ignoring the unresolved full dependency audit gate without separately approved resolution.

## Codex execution directive
Read docs/PHASE_1F_CODEX.md and docs/WHC_STAGING_ACCEPTANCE.md from codex/phase-1f. Do not request staging authorization again. Proceed with permitted staging work if actual WHC/cPanel access is available; verify target plan, Passenger startup contract, secrets, resource isolation, Node/ABI and existing DNS before making changes. Stop and report specific access blockers or security failures rather than guessing. Do not claim deployment until actual remote URL passes checks. Update GitHub docs and report exact source SHA, staging URL, verification evidence and blockers.

This file records the owner's authorization but does not itself constitute evidence of a deployed staging environment.
