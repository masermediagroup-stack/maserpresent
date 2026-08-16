# Maserpresent — Architecture

Evidence-based plan for **this repository** (`masermediagroup-stack/maserpresent`), with private `/p/[slug]` and public `/work/[slug]` on the existing [maser-media](https://github.com/masermediagroup-stack/maser-media) site.

Companion docs: [product-brief.md](./product-brief.md), [presentation-ux.md](./presentation-ux.md), [decisions/0001-foundation.md](./decisions/0001-foundation.md), [decisions/0002-product-name.md](./decisions/0002-product-name.md), [decisions/0003-presentation-chrome.md](./decisions/0003-presentation-chrome.md), [decisions/0004-hosting-and-visibility.md](./decisions/0004-hosting-and-visibility.md), [build-status.md](./build-status.md).

## Repository audit (maserpresent, 2026-08-16)

This repo is the CMS home. Before Phase 0 rewrite it contained:

| Present | Absent |
| --- | --- |
| GitHub `masermediagroup-stack/maserpresent`, branch `main` | No `package.json`, lockfile, or package manager |
| Root `README.md` (`# maserpresent`) | No Next.js app, no `src/`, no route groups |
| Nested leftover unzip `casework-handoff/casework/` (Casework-titled docs + `AGENTS.md`) | No `.agents/skills` in the upload (handoff zip was incomplete vs maser-lab `pack-handoff.sh`) |
| No CI, no `.env.example`, no tests | No Supabase, auth, middleware, storage adapter |
| No design tokens or primitives | No renderer package |

**Phase 0 of this PR** flattens docs to the repo root, renames the product to Maserpresent, adds presentation-chrome ADRs, and copies curated skills. It does **not** scaffold an application.

### Patterns to reuse from maser-lab (not runtime)

Tailwind 4 + shadcn `base-nova` + `@base-ui/react`, `cn()`, compact studio density, product-vs-shell token separation (`--lab-*` must never be required). Do not import files from `lab/`.

### maser-media (facts)

- Repo: `masermediagroup-stack/maser-media`
- Live: https://masermedia.co
- App: `next-app/` (Next 16, React 19, Tailwind 4, shadcn, Base UI)
- Hardcoded work: `/work`, `/work/helm-in-house-saas`, `/work/main-street-pub-grub`

## System shape

```text
┌─────────────────────────────┐     ┌──────────────────────────────┐
│ Maserpresent (this repo)    │     │ maser-media (existing)       │
│ studioOrigin (Vercel)       │     │ https://masermedia.co        │
│ /studio /auth /preview      │     │ / /work /about /contact      │
│ @maser/maserpresent-renderer│     │ /p/[slug]     review         │
└─────────────┬───────────────┘     │ /work/[slug]  published      │
              │                     └──────────────┬───────────────┘
              └──────────────┬─────────────────────┘
                             ▼
                  Supabase (one project)
                  Postgres + Auth + Storage
```

- This app owns authoring, magic-link sessions, uploads, preview, and the renderer package.
- maser-media owns the agency site and serves the client deck: `/p/[slug]` while `review`, `/work/[slug]` (and Work index) while `published`.
- Both apps use the **same** Supabase project. Never ship the service-role key to either browser bundle.

This Phase 0 does **not** edit maser-media. Those routes are a later PR in that repo, after the renderer package exists.

## Folder structure (Phase 1 will create the app)

```text
maserpresent/                    # this repo root
  AGENTS.md
  README.md
  docs/                          # Phase 0 packet (this folder)
  .agents/skills/                # curated pack
  src/
    app/
      (auth)/                    # magic-link sign-in
      (studio)/studio/...
      (presentation)/present/[token]/...
    components/
      ui/                        # primitives (copy shadcn patterns; do not import lab)
      studio/
      presentation/              # deck chrome: stage, arrows, tab bar
      blocks/
    lib/
      supabase/                  # browser, server, middleware clients
      storage/                   # adapter (Supabase now; Cloudinary later)
      blocks/                    # Zod discriminated unions
    config/product.ts            # { name: "Maserpresent", slug: "maserpresent" }
    styles/
      studio.css
      presentation.css
  packages/
    maserpresent-renderer/       # published as @maser/maserpresent-renderer
  supabase/
    migrations/
    seed/
  public/seed/                   # licensed Northline stills (also uploaded in seed)
  e2e/
  vitest.config.ts
```

No `(public)` marketing route group in MVP.

## Route and host boundaries

| Surface | Host | Routes | Who |
| --- | --- | --- | --- |
| Studio + preview | `studioOrigin` (Vercel in MVP) | `/studio/*`, `/auth/*`, optional `/present/[token]` | admin, editor; optional extra-secret link |
| Private client slug | `https://masermedia.co` | `/p/[slug]`, `/p/[slug]/assets` | client team while `status = review` |
| Public Work piece | `https://masermedia.co` | `/work/[slug]` | anyone, only if `published` |
| Work index | `https://masermedia.co` | `/work` | includes published CMS projects plus existing file-route pieces |
| Agency marketing | `https://masermedia.co` | `/`, `/about`, `/contact` | unchanged; not this app |

Product config stores `publicOrigin` (`https://masermedia.co`) and `studioOrigin` (Vercel URL). Custom studio domain is post-MVP.

**Drafts never render on masermedia.co.** Do not proxy `/present/[token]` through that host (CDN, cache, and draft-leak risk). The private **slug** on `/p/` is an intentional review surface, not a draft dump.

See [0004-hosting-and-visibility.md](./decisions/0004-hosting-and-visibility.md).

## Authentication and authorization

- Studio: Supabase Auth **magic link only**. Invite-only: an admin inserts `profiles` (email + role) before a link can create a session. Unknown emails get no session. No password auth. No public sign-up.
- Roles: `admin` | `editor` on `profiles.id → auth.users.id`.
- Client viewers: no account. `share_links.token_hash` (and optional `passcode_hash`). Show the raw token **once** at creation. Revoke and regenerate supported.
- Enforce RLS on every user-owned or private table and bucket, **and** re-check authorization in server code for sensitive operations.
- Middleware: unauthenticated users hitting `/studio/*` redirect to sign-in. Session refresh via `@supabase/ssr`.

## Data model

Implement migrations, generated database types, timestamps, indexes, foreign keys, and soft archival (`status = archived`) where appropriate.

- `profiles` — `role`: admin, editor.
- `clients` — as original spec.
- `projects` — `status`: draft, review, published, archived. `visibility` may mirror that (`private` while review, `public` while published) but **status is the source of truth** for which masermedia.co route serves the row.
- `chapters` — bottom **tabs**. `unique(project_id, slug)`. `is_visible` hides a chapter from the deck and the tab bar.
- `slides` — **pages** inside a chapter. `chapter_id`, `position`, `is_visible`. Deck order is chapters by `position`, then slides by `position`.
- `blocks` — `slide_id` FK; JSON `content`/`style` validated by Zod, never spread untyped.
- `assets` — as original spec. Font files use `kind = font`.
- `share_links` — store hashes only.
- `studio_settings` — singleton: studio name, mark, accent, contact details for chrome (not a public marketing CMS).
- `events` — publish, unpublish, share-link create/revoke, download, destructive asset action. Lightweight view/download log without invasive tracking.

**Not in MVP schema**

- `project_snapshots` — live rows; unpublish to edit.
- `inquiries` — use existing masermedia.co contact form.
- Rate-limit tables — none (known limitation).

Publish rule (maser-media, later):

- `/p/[slug]` serves the project only when `status = review` (optional passcode). `noindex`.
- `/work/[slug]` serves the project only when `status = published`. Listed on `/work`. `/p/[slug]` 301s here.
- Any other status → `notFound()`.
- Autosave while `draft` cannot appear on masermedia.co. Autosave while `review` **does** appear on `/p/[slug]`. Autosave while `published` **does** appear on `/work/[slug]`; the studio UI must warn and prefer flipping back to `review` before large edits.

## Storage

- Supabase Storage for MVP. `lib/storage/` is an adapter so Cloudinary can be added later without rewriting callers.
- Private originals: signed URLs. No guessable public URLs for drafts or source files.
- Public delivery on `/work/[slug]` (and signed private delivery on `/p/[slug]` during review) only for media that belongs to that project. Default to not exposing the original bucket publicly. Draft originals stay studio-only.
- Validate file type and size on client and server. Reject executables and unexpected formats.
- Font uploads: `woff2` (and `woff` if needed), project-scoped `@font-face`, fallback to studio UI font on failure.
- Failed uploads must not leave a misleading database row.
- Direct/resumable uploads; do not proxy full large files through a serverless function.

## Renderer package

`@maser/maserpresent-renderer` is the single composition for:

1. Studio desktop/mobile preview
2. Optional studio-host `/present/[token]`
3. masermedia.co `/p/[slug]` (review) and `/work/[slug]` (published)

It consumes typed slide/block JSON + project theme tokens + deck chrome (stage, arrows, tab bar). It must not import studio chrome, lab tokens, or Next.js-only studio code. maser-media depends on this package; it does not duplicate block renderers.

Layout modes `Editorial` | `Immersive` | `Systematic` are per-slide composition. Theme tokens are constrained; reject unreadable combinations (contrast floor).

Deck behavior is specified in [presentation-ux.md](./presentation-ux.md).

## Security and privacy

- Service-role credentials stay server-side (this app’s server and, if needed, maser-media server components only).
- Draft: never on masermedia.co.
- Review `/p/[slug]`: `noindex, nofollow`; excluded from sitemaps and `/work`.
- Published `/work/[slug]`: listed on Work; may be indexed. Canonical is `/work/[slug]`.
- Sanitize TipTap HTML and approved embeds.
- **Rate limits are deferred.** Magic-link and passcode attempts are unprotected in MVP. Treat this as a launch risk; add Postgres or Upstash limits before any wide client sharing.

## Performance and accessibility budgets

Carry these onto `/p/[slug]` and `/work/[slug]`:

- Lighthouse 90+ on a representative published page where it can be measured.
- LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 at p75 when field data exists.
- Reserved media dimensions; responsive images; lazy-load below-fold slides; the current (and maybe next) slide are the only prioritized assets.
- Video muted and user-controllable; never autoplay audio.
- `prefers-reduced-motion`.
- Visible focus, heading order, landmarks, keyboard (including arrow keys for slides), contrast, descriptive download labels.
- Core flows at 360, 768, 1440, and a wide desktop viewport.
- Bottom tabs remain usable when they overflow (horizontal scroll, not clipped labels).

## Testing boundaries

| Layer | Where | What |
| --- | --- | --- |
| Unit | Vitest | Zod block schemas, slug rules, publish-status helpers, token hashing, deck order (chapter→slide) |
| Component | Vitest + RTL | Studio primitives; tab active/hover/focus; arrow visibility on first/last slide |
| Authz | SQL / integration | RLS: anonymous cannot read drafts or private assets; editor cannot escalate to admin |
| E2E | Playwright | Magic-link (stubbed), project create, story edit, preview, review-status private slug, publish to Work |
| E2E (later) | maser-media | `/p/[slug]` only when review; `/work/[slug]` only when published; Work index includes published CMS rows |

Phase 0: no app, so no lint/typecheck/build of the product.

## Skill and workflow transfer

Skills live in `.agents/skills/` (copied in Phase 0 from maser-lab, dither packet stripped):

- `maser-lab-web` (Shape / Implement / Review / Harden — primary workflow)
- `verification`
- `web-design-guidelines`
- `shadcn`
- `vercel-react-best-practices`
- `vercel-composition-patterns`
- `review-animations`, `ui-animation`, `emil-design-eng`, `frontend-design`

Do **not** copy Three.js, Dither, Convex, Firebase, or Hugging Face skills. They will fight this stack.

Work phase by phase. Stop for approval after each phase.

## Proposed versions (pin exactly at Phase 1 init)

Record resolved versions in the lockfile. Intended set (as of 2026-08-13 lab audit):

| Package | Version |
| --- | --- |
| next | 16.2.9 (align with lab; maser-media is on 16.1.6 — renderer must not depend on a mismatched Next API) |
| react / react-dom | 19.2.4 |
| typescript | 5.x |
| tailwindcss | 4.3.x |
| @base-ui/react | ^1.6 (lab) |
| shadcn | ^4.12 |
| lucide-react | ^1.21 |
| motion | current 12.x (`motion`, not `framer-motion` import path) |
| @supabase/supabase-js | 2.112.x |
| @supabase/ssr | 0.12.4 |
| zod | current 3.x/4.x at init |
| react-hook-form | current |
| @tiptap/react + starter-kit | 3.x |
| @dnd-kit/core | 6.3.x |
| vitest | 4.x |
| @testing-library/react | current |
| @playwright/test | 1.61.x |

## Environment (`.env.example`, Phase 2)

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=          # server only
NEXT_PUBLIC_PRODUCT_NAME=Maserpresent
NEXT_PUBLIC_PUBLIC_ORIGIN=https://masermedia.co
NEXT_PUBLIC_STUDIO_ORIGIN=          # Vercel URL
```

No secrets in git. Seed two users via env-provided emails, not committed passwords (magic link).

## maser-media integration (later PR, not this repo)

1. Depend on `@maser/maserpresent-renderer`.
2. `app/p/[slug]/page.tsx`: serve only `status = review` (passcode if set); else `notFound()`. `noindex`.
3. `app/work/[slug]/page.tsx`: serve CMS projects only when `status = published`. Keep existing **file** routes for Helm and Main Street.
4. `/work` index: existing hardcoded pieces plus published CMS projects.
5. After publish, `/p/[slug]` redirects to `/work/[slug]`.
6. Do not add studio routes on maser-media.
7. Deny CMS slugs `helm-in-house-saas`, `main-street-pub-grub`, and `work`.
