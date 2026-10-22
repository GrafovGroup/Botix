# Phase 1C QA evidence

## Scope and limits

All 144 content URLs remain in scope (72 English, 72 French). No new photographic placements or external fonts. Source inspection confirms responsive layouts, header/menu controls, focus styles, reduced-motion rules, locally optimized/preloaded homepage imagery, explicit brand image dimensions and text fallback. These are implementation observations, not visual acceptance or measured performance.

Real-browser access to the local preview was rejected by browser security policy in this conversation. No alternate browser/connection was used to bypass it. Mobile/tablet/desktop screenshots, image-crop inspection, keyboard/mobile-menu interaction, client-side form/download interaction, automated contrast/accessibility audits and LCP/CLS/INP measurements remain pending. No screenshot or Web Vitals score is claimed.

## Automated checks

Final command results are recorded in IMPLEMENTATION_STATUS.md. Coverage includes source/future-date/relationship publication gates, combined catalogue filters, query context including rental dates and province, verified phone visibility, analytics allowlist/consent, production delivery gates, challenge/validation/rate limiting, synthetic durable receiver acceptance/deduplication/conflict, HTTP metadata/internal links, disabled delivery and invalid submissions.

The route smoke runner is local-only and checks API availability before sending synthetic submissions; it refuses when delivery is enabled. The receiver harness uses injected transport and a temporary synthetic record, with no external lead transmission. Production receiver/TLS/CRM routing still needs owner-authorized end-to-end verification.

## Owner visual acceptance matrix

At 375, 768 and 1440 CSS pixels, inspect both locales for: home hero and header; catalogue search/combined filters/sort/reset/empty state; product facts/source links/CTAs; rental and industry inquiry context; province/city context; quote field validation, rental dates, consent, download, loading/confirmation/failure and language switching. Check 200% zoom, keyboard-only traversal, visible focus, reduced motion, no overflow, meaningful accessible names and readable contrast. Use synthetic data; do not save screenshots containing real lead details.
