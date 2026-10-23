# Staging security prerequisites — 2026-10-22

This supersedes the dependency/TLS blockers recorded in the staging execution evidence. Branch `codex/staging-security-fix` starts from execution commit `cf9b87f` / PR #6. No merge or application deployment is implied.

## Dependency remediation

The only lockfile path to vulnerable braces was Next's ESLint plugin → fast-glob → micromatch → braces. The plugin uses fast-glob in exactly one module, `dist/utils/get-root-dirs.js`, for `globSync(pattern, {onlyDirectories:true})`. All lint rules and the existing Next/TypeScript lint configuration remain enabled.

A pnpm override scoped to `@next/eslint-plugin-next@16.4.2` replaces that dependency with registry `tinyglobby@0.2.17`, already present in the project dependency graph. The vulnerable packages are removed from the lockfile, not ignored in audit. No runtime application dependency changed.

Tinyglobby returns relative paths by default and includes trailing directory separators; fast-glob preserves absolute input paths. A checked-in pnpm patch sets `absolute` based on the original pattern and removes trailing separators while retaining filesystem roots. This is a narrow compatibility patch to the lint plugin, not a claim that these glob libraries are interchangeable for every consumer. Keep the version scope and re-review/remove the patch when upgrading Next. Both the override and patch are required together.

Tests exercise default root, absolute directory, wildcard, brace pattern, relative pattern, array and no-match behavior through the installed plugin, and intentionally lint an image element to prove Next's rule still fires. The first compatibility run caught the relative/trailing-separator mismatch; the patch corrects it. Full audit is required without exceptions, and the existing CI still builds/tests production and preview.

## WHC TLS remediation

Using the existing authorized WHC session, selected **only staging.botix.ca** in SSL/TLS Certificates → Wizard and requested the free Let's Encrypt certificate. cPanel reported successful HTTP domain validation and certificate installation. No wildcard, apex or mail names were selected; no payment or terms acceptance was presented. The panel subsequently shows staging.botix.ca and its existing www alias as AutoSSL Domain Validated, expiring January 20, 2027 with automatic renewal. No other domain setting was edited.

After the server installed the certificate, this probe succeeded with certificate validation enabled and returned HTTP/2 200:

```sh
curl -I --resolve staging.botix.ca:443:51.161.57.68 --max-time 15 https://staging.botix.ca/
```

The address override isolates certificate validation from the local DNS cache. No `--insecure` option, credentials or browser-warning bypass was used. HTTP 200 is the existing host response, **not proof of the BOTIX app being deployed or protected**. The TLS screenshot is stored privately outside Git.

## Acceptance status

Local verification passed: 40 unit tests (including installed-plugin root discovery and active-rule regression checks), ESLint, TypeScript, frozen-lockfile install, full unsuppressed audit (zero known vulnerabilities), and git diff --check. Runtime application source is unchanged; the PR CI will repeat both Linux build/smoke modes and audits. Its status must be checked independently. Deployment still requires a clean Linux candidate from the fixed source, confirmed target architecture/Passenger contract, host-level access protection and the complete hosted acceptance matrix. No application archive uploaded, Node app started, live inquiry sent, production deployment or branch merge occurred in this fix.
