# Phase 2 deployment

Owner authorized deployment with “lets deploy” on 2026-10-22. Publish the combined Phase 2 application from PR #12 to botix.ca using a clean Linux production artifact, preserve the prior release for rollback, and verify all public routes plus comparison/context flows. Keep the existing hosting app, protected staging and disabled inquiry delivery. No email, DNS, purchase or PR merge is included.

## Verified deployment — 2026-10-22 (Toronto)

- Live at https://botix.ca. Source: `7a0fdd05b07a60670c325bd7e766389dda38c2dc`, PR #12 (still draft/unmerged).
- Clean Linux x64 artifact from Actions run `39890062956`; release checks `39890063139` passed. Archive SHA256: `aad10dba450fb754776db4061c3ce86c30715b007c2fd6be03485bf0d5a3f403`.
- WHC stable application directory: `/home/nvfglyl5/botix-production/app`. Production-only safe launcher reads this selector key and keeps inquiry delivery disabled. Use a real directory: CloudLinux resolves symlinks when locating its runtime environment.
- The vendor relocation first refused a populated destination after moving its runtime folder. Restored that folder, relocated to the empty stable app root, retained the old release, then installed the verified new release. The retained old Next worker survived the selector restart and caused an asset failure; stopped only that verified old worker. Fresh production passed the full acceptance below.
- Read-only live acceptance passed all 144 EN/FR routes, canonical/hreflang, indexing, security headers, JS/CSS, optimized image, catalogue filters, 404s and disabled inquiry delivery. Phase 2 comparison, contextual inquiry links, buyer pathways and city/category links passed.
- Live browser: selected Unitree G1 and BellaBot, submitted comparison, switched to French and confirmed both selections/table content persisted. English live comparison screenshot retained as task evidence.
- HTTP and www redirect to canonical HTTPS with 301. Protected staging still returns 401 plus noindex/nofollow/noarchive. No real inquiry was submitted.

## Rollback and operation

Prior release retained at `botix-production/releases/93673ec63eaf-retained`; pre-switch htaccess, launcher and production-only selector settings at `botix-production/rollback/phase2-7a0fdd05b07a/`. Keep the stable selector key and safe launcher. To roll back, retain the current app directory under a new private release name, copy the retained prior release into the real `botix-production/app` directory, restart only that app and verify health/assets/all routes. Check for a surviving worker whose cwd points to the displaced release and terminate only that verified worker if necessary. Never restore the entire account selector configuration or affect other apps.

No receiver service or mailbox transport was activated. No DNS/email changes, purchases or PR merge performed. Later evidence commits do not change the deployed artifact SHA above.
