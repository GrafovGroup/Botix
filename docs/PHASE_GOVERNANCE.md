# BOTIX Development Phase Governance

GitHub repository: GrafovGroup/Botix. GitHub is the canonical source of truth for all BOTIX project specifications and implementation.

## Mandatory rules for Codex and collaborators
1. Every development phase must have its own committed Markdown master prompt under `docs/phases/PHASE_<ID>.md` or an existing equivalent under `docs/`. Never rely solely on chat history.
2. Existing prompts: `docs/PHASE_1A_CODEX.md` and `docs/PHASE_1B_CODEX.md`. Preserve them as canonical for their respective phases; do not silently replace.
3. Each phase implementation should use a dedicated feature branch and a pull request, unless explicitly authorized otherwise. Preserve ongoing work, especially Phase 1A.
4. For each phase, record scope, prerequisites, deliverables, acceptance criteria, test outcomes, blockers and owner actions. Maintain `docs/PHASE_INDEX.md` and `IMPLEMENTATION_STATUS.md` as the work advances.
5. Commit specifications before execution. Commit code as it is completed. Never claim a phase is built merely because its prompt is committed.
6. Run available lint, typecheck, build and tests; report failures accurately. Do not merge, deploy, modify DNS or purchase services without authorization.
7. Use English and Québec-appropriate French, Canadian nationwide coverage, approved BOTIX Signature brand identity, and truthful B2B claims throughout.
8. Maintain the approved branding reference and vector asset files in GitHub once actual assets are available. Avoid committing copyrighted or unlicensed manufacturer imagery.

## Phase workflow
Draft specification -> commit specification -> inspect existing implementation -> create feature branch -> implement -> test -> pull request -> owner review -> merge -> deploy with explicit approval.

## Current specifications
- Phase 1A: `docs/PHASE_1A_CODEX.md` — foundation and bilingual national site.
- Phase 1B: `docs/PHASE_1B_CODEX.md` — catalogue, product pages, rentals and inquiries.

Future phases should use the next available ID, with dependencies recorded in the index.
