# Maserpresent — Build status

Phase-by-phase checklist. **Phase 0–1 are done in this repo** (2026-08-16). Phases 2–9 stay pending until each is approved. Do not start a phase until the previous one is approved.

Work phase by phase. At the end of each implementation phase: lint, typecheck, tests, production build, desktop and mobile of the primary flow, files changed, decisions, limitations, AC confirmation — then stop.

Full original prompt context is retained: Phase 1 foundation → 2 Supabase/auth → 3 clients/projects → 4 assets → 5 story/slides → 6 deck renderer → 7 private slug + publish → 8 Work listing (on maser-media) and studio settings → 9 launch. PR #53 cuts still apply except Work listing of **published** CMS projects (ADR 0004). Client chrome is the Figma deck (ADR 0003).

## Phase 0 — Repository audit and decision record

**Status: complete** (maserpresent, 2026-08-16)

- [x] Inspect this repo (empty app, nested Casework-named handoff, no package manager)
- [x] Carry forward maser-lab and maser-media audit facts from PR #53
- [x] Rename product identifiers Casework → Maserpresent (keep “case study” as content language)
- [x] Lock foundation: [0001-foundation.md](./decisions/0001-foundation.md)
- [x] Lock name: [0002-product-name.md](./decisions/0002-product-name.md)
- [x] Lock client deck chrome: [0003-presentation-chrome.md](./decisions/0003-presentation-chrome.md), [presentation-ux.md](./presentation-ux.md)
- [x] Lock hosting: [0004-hosting-and-visibility.md](./decisions/0004-hosting-and-visibility.md) (private `/p/[slug]` → public `/work/[slug]`)
- [x] Write [product-brief.md](./product-brief.md), [architecture.md](./architecture.md)
- [x] Copy curated skills; flatten docs to repo root
- [x] No feature implementation; no Next.js scaffold

**Acceptance**

- [x] Audit is evidence-based (this repo + PR #53 + Figma node `1:2`)
- [x] Architecture covers studio, private `/p/[slug]`, public `/work/[slug]`, database (including `slides`), storage, renderer, testing
- [x] Open decisions and spec exceptions are explicit
- [x] No feature implementation started

**This phase did not run** lint/typecheck/build (no app yet).

**Next:** Approve **Phase 1** in this repo.

---

## Phase 1 — Foundation and design system

**Status: complete** (2026-08-16)

- [x] Initialize Next.js, TypeScript, Tailwind, lint, format, Vitest, Playwright
- [x] Route groups: `(auth)`, `(studio)`, `(presentation)` — **no public marketing group**
- [x] Semantic tokens for studio UI and project-scoped presentation themes, including deck tokens (stage, bar `#222`, tab active darker, arrow circle)
- [x] Primitives: Button, IconButton, Input, Textarea, Select, Checkbox, Switch, Dialog, Dropdown, Tabs, Tooltip, Toast, EmptyState, Skeleton, StatusBadge
- [x] Studio shell: compact sidebar, top bar, placeholder routes
- [x] Presentation shell placeholder: 16:9 stage, bottom tab bar, next arrow (static copy from Figma: Typography / Logo / Brand Design / Do’s and Don’ts / Look Book)
- [x] No Storybook; `/studio/design-system` in development
- [x] Scaffold `@maser/maserpresent-renderer` package (theme + deck chrome shell is enough)
- [x] Product name in `src/config/product.ts`

**Not in this phase:** maser-media `/p/[slug]`, Supabase, live slide data, swipe.

**Verification:** `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm test:e2e` — all pass.

**Next:** Approve **Phase 2** (Supabase schema, authentication, and authorization).

---

## Phase 2 — Supabase schema, authentication, and authorization

**Status: pending**

- [ ] Supabase clients: browser, server, middleware (`@supabase/ssr`)
- [ ] Migrations: profiles, clients, projects, chapters, **slides**, blocks, assets, share_links, studio_settings, events — **not** inquiries, snapshots, or rate-limit tables
- [ ] Magic-link sign-in/out, protected `/studio`, session refresh
- [ ] Invite-only: unknown emails cannot session
- [ ] Admin/editor helpers
- [ ] Seed: two invited users, one client, Northline project shell (no secrets committed)
- [ ] `.env.example` and setup docs
- [ ] Prove anonymous cannot read drafts or private assets

---

## Phase 3 — Clients, projects, and dashboard

**Status: pending**

- [ ] Dashboard: recent projects, status filters, New Project
- [ ] Client list/create/edit/detail; archive not hard-delete
- [ ] Project create + Overview: client, title, slug, summary, year, services, industries, status, visibility, hero
- [ ] Deny slugs that collide with maser-media `/work` file routes
- [ ] Validation, dirty-state, empty/error/loading
- [ ] Unpublish-to-edit rule surfaced when status is `published`

---

## Phase 4 — Asset library and media pipeline

**Status: pending**

- [ ] Direct/resumable uploads; progress, cancel, retry, type/size errors
- [ ] Grid/list, kind filters, search, tags, selection
- [ ] Metadata, alt, usage notes, download permission, version/replace
- [ ] Signed private downloads; no guessable public originals
- [ ] Font uploads (`woff2`/`woff`) as `kind = font`
- [ ] Failed uploads leave no misleading row
- [ ] Individual downloads only (**no ZIP**)

---

## Phase 5 — Story builder (chapters, slides, blocks)

**Status: pending**

- [ ] Chapters (bottom tabs) + slides + all MVP block Zod schemas and editors
- [ ] Inserter, reorder (dnd-kit + keyboard), duplicate, hide, delete, move across slides/chapters
- [ ] Autosave + Saving/Saved/Error
- [ ] Preview uses the shared **deck** renderer
- [ ] Optional identity chapter starter: Typography, Logo, Brand Design, Do’s and Don’ts, Look Book
- [ ] Seed full Northline story + checked-in licensed media, enough slides to exercise arrows and tab highlight

---

## Phase 6 — Presentation renderer and theming

**Status: pending**

- [ ] Shared renderer: preview, optional `/present`, masermedia.co `/p/[slug]` and `/work/[slug]`
- [ ] Deck chrome per [presentation-ux.md](./presentation-ux.md): prev/next visibility, swipe, keyboard, tab jump to chapter slide 1
- [ ] Active tab = darker background; hover = label underline; focus-visible ring
- [ ] Editorial / Immersive / Systematic **per slide**
- [ ] Theme controls with contrast floor; uploaded fonts scoped with fallback
- [ ] Reduced motion: instant cuts
- [ ] Publish `@maser/maserpresent-renderer` for maser-media to consume

---

## Phase 7 — Private review, asset delivery, and publishing

**Status: pending**

- [ ] Studio Sharing: copy private `https://masermedia.co/p/[slug]`, optional passcode (hashed), downloads toggle
- [ ] Optional extra-secret `/present/[token]` on **this host only** (not the client destination)
- [ ] Individual signed downloads; **no ZIP**
- [ ] Status: `draft` (studio only) → `review` (private `/p/[slug]`) → `published` (public `/work/[slug]`, listed on Work)
- [ ] Flip back to `review` to remove from Work; live rows (no snapshot)
- [ ] Event log: review share, publish, unpublish, download, destructive asset
- [ ] Document maser-media contract: `/p/[slug]`, `/work/[slug]`, Work index; implement in a **maser-media PR**
- [ ] Review pages: `noindex`; published Work pages may be indexed; no sitemap of drafts

**Note:** Until the maser-media PR lands, copied URLs 404 on production. Call that out in the studio UI.

---

## Phase 8 — Work index, conversion, and studio settings

**Status: pending**

Work **index and public `/work/[slug]`** are maser-media work (same later PR as Phase 7). This repo supplies status + renderer. This phase in **this** repo:

- [ ] Studio settings: name, mark, accent, contact details for studio chrome, default presentation mode
- [ ] Sharing UI: private slug vs public Work URL, current status
- [ ] Graceful defaults if settings are empty
- [ ] Do **not** build a Maserpresent marketing `/`, `/about`, `/contact`, or inquiry admin
- [ ] Coordinate maser-media: `/work` lists published CMS projects alongside Helm / Main Street file routes

---

## Phase 9 — Quality, performance, and launch readiness

**Status: pending**

- [ ] Full test suite, typecheck, lint, production build
- [ ] Playwright: sign-in, project create, upload stub, story edit, preview, review private slug, publish to Work, tab jump, next/prev
- [ ] Authz tests including forged IDs and revoked links
- [ ] A11y, reduced motion, media controls, 360/768/1440, tab overflow
- [ ] Media-heavy pass on LCP/INP/CLS (current + next slide)
- [ ] Error monitoring hooks; operational runbook; deployment docs
- [ ] Remove dead code and placeholders
- [ ] README: new editor can sign in, create, preview, share, publish

---

## Deferred after MVP

- Rate limits (magic link, passcode)
- ZIP bundles
- Inquiries / conversion forms inside this app
- Published snapshots / rollback
- Custom studio domain
- Long-scroll article viewer as an alternate mode
- Inline comments, DAM, AI copy, PDF, multi-studio, realtime collab, Figma/Drive sync, arbitrary CSS
- Cloudinary (adapter exists; not wired)

## Definition of done (reminder)

See [product-brief.md](./product-brief.md). MVP is studio authoring + private masermedia.co `/p/[slug]` for the client team + public `/work/[slug]` after approval.
