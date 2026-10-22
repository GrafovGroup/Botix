# BOTIX.ca — Phase 1B Codex Master Prompt
## Robotics catalogue, product details, rentals and conversion

You are Codex, the senior full-stack engineer, design lead and Canadian B2B commerce strategist for BOTIX.ca. Execute autonomously in the existing repository. **Phase 1A may still be running.** First inspect branches, files, commits and implementation state. Never overwrite, reset, force-push or conflict with ongoing Phase 1A work. If Phase 1A changes are not yet available, preserve this specification and defer implementation until they are available; do not create a second competing app. Use a dedicated phase-1b branch based on the completed Phase 1A branch when available, and open a pull request for review. Never deploy, change DNS, buy services or merge without owner approval.

## Core positioning
BOTIX — Commercial Robotics. Tagline: Intelligent Robots. Real-World Solutions. Canadian B2B supplier/sourcing and rentals platform, with humanoid robotics as the flagship. Premium Signature design: black, white, silver, restrained futuristic visual identity; standalone wordmark and X icon; humanoid imagery as supporting brand media. Follow docs/BRAND.md and docs/PHASE_1A_CODEX.md. Every feature must work in English and Québec-appropriate French.

## 1. Data model and catalogue
Create a typed, extensible catalogue system for robots, manufacturers, applications and industries. Fields: slug, localized name and description, manufacturer, category, subcategory, intended use, purchase/rental/pilot inquiry options, availability status (verified only), verified specifications with source and last-reviewed date, media rights/attribution, related solutions, SEO metadata, feature flags and publication state. Provide a clear content validation mechanism and prevent unpublished/unverified products from appearing as purchasable. Prefer local typed seed data or existing CMS adapter; do not require paid services.

Categories:
- Humanoid Robots (flagship)
- Commercial Cleaning Robots
- Warehouse & Logistics Robots / AMRs
- Industrial Robots & Cobots
- Inspection & Security Robotics (no false claims about surveillance or regulated capabilities)
- Service, Hospitality & Event Robots
- Robot Rentals & Demonstrations

Do not claim reseller authorization, Canadian inventory, stock, pricing, manufacturer partnerships, deployment capability or service guarantees without confirmation. If sample manufacturers/products are included (e.g. Unitree G1, Unitree H1, Agility Digit), clearly mark them as editorial examples with sourced, dated specs and no implied dealership or availability. Avoid unauthorized product images and logos.

## 2. Catalogue experience
Create polished responsive EN/FR category hubs, browse/search, filters (application, robot type, industry, purchase/rental/pilot), sorting, helpful empty states and accessible cards. Prominent humanoid spotlight, but show breadth of commercial offerings. Make all navigation, form validation, breadcrumbs, metadata and CTAs bilingual.

## 3. Product templates
Build reusable product-detail pages with image gallery, benefits, applications, verified specifications, purchase/rental/pilot inquiry CTAs, related robots, FAQs and trust-building content. Do not invent specs or show empty specification tables. No fake price tags, fake reviews, 'in stock', delivery guarantees or testimonials. Add structured data only when factual and appropriate; avoid Offer schema without verified pricing/availability.

## 4. Conversion and quote workflows
Extend existing Phase 1A forms rather than creating incompatible duplicates. Separate workflows:
- Purchase / equipment sourcing quote
- Robot rental / event demonstration inquiry
- Enterprise pilot / integration consultation
- General robotics project
Fields: business/company, contact, email, phone, location/province, category/product, use case, quantity, desired dates/timeline, budget optional, comments, consent. Server validation, anti-spam, privacy-aware handling, success only on actual confirmed submission. Keep delivery provider configurable and document credentials in OWNER_ACTIONS.md. Avoid storing sensitive submissions in public repository.

## 5. Commercial rental landing pages
Create event robots, corporate demonstrations, trade shows, university/research demos and short-term pilots landing pages with realistic positioning, safety/operational requirements, scope and quote capture. Never imply a rental fleet exists unless verified.

## 6. Industries and buyer journeys
Provide practical EN/FR industry paths: manufacturing, warehousing, facility management, hospitality, events, retail, universities/research, logistics. Show how businesses evaluate robotic solutions, request demonstrations, review feasibility and engage sourcing support. Distinguish commercially deployed systems from emerging humanoid capabilities.

## 7. National SEO
Extend Phase 1A architecture across major Canadian cities, provinces and territories, including Toronto/GTA municipalities, Vancouver/Metro Vancouver, Montreal, Ottawa/Gatineau, Calgary, Edmonton, Quebec City, Winnipeg, Halifax, Victoria, Hamilton, Kitchener-Waterloo, London, Saskatoon, Regina and St. John's. Use useful localized content, no duplicate doorway pages, no fabricated physical offices. Canonical, sitemap, hreflang en-CA/fr-CA, structured breadcrumbs, robots and OG tags.

## 8. Design and quality
Maintain approved BOTIX visual direction and accessibility. Distinctive, elegant layout, excellent mobile UX, keyboard support, contrast, reduced motion, image optimization, Core Web Vitals-conscious loading. Avoid overly decorative effects that reduce conversion. Use legal imagery only. Include unit tests for catalogue validation/filtering and form logic, plus route smoke tests where infrastructure permits.

## 9. Execution protocol
1. Inspect current branch and Phase 1A progress; identify reusable components and design tokens.
2. Create a Phase 1B implementation checklist and record assumptions.
3. Implement incrementally on a dedicated branch, never destructively modifying unfinished Phase 1A work.
4. Run lint, typecheck, build and available tests; fix errors.
5. Update README, IMPLEMENTATION_STATUS.md and OWNER_ACTIONS.md.
6. Produce concise completion report listing actual routes, commits, tests, unverified product claims, outstanding owner dependencies and PR URL.
7. Leave deployment and merge for owner review.

## Acceptance criteria
- Humanoid flagship and at least five commercial robotics category hubs.
- Extensible typed product model and bilingual reusable detail template.
- Search/filter catalogue that works on mobile.
- Purchase, rental and pilot inquiry flows integrated with existing submission architecture.
- Relevant industry and rental pages.
- Bilingual navigation, metadata, SEO and validation.
- No fabricated business facts, stock, dealership, offices, specs, reviews or pricing.
- Tests/build pass or blockers documented precisely.

**Important:** Do not start a second project or disrupt Phase 1A. If current code has not been pushed yet, wait to implement Phase 1B until the Phase 1A foundation is available; keep this prompt committed and ready.
