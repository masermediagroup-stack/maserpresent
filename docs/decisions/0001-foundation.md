# Maserpresent lives in this repo and feeds masermedia.co

Maser-lab is a UI lab; Maserpresent is an in-house CMS. We will not put the CMS in the lab monorepo. Studio and preview run on a Maserpresent Vercel app. Client-facing decks live on masermedia.co: private `/p/[slug]` while in review, public `/work/[slug]` after approval. Shared renderer package.

Status: accepted (grilling 2026-08-13 in maser-lab PR #53). Repo name closed by [0002-product-name.md](./0002-product-name.md). Client chrome closed by [0003-presentation-chrome.md](./0003-presentation-chrome.md). **Hosting and Work listing** closed by [0004-hosting-and-visibility.md](./0004-hosting-and-visibility.md).

## Context

The original spec described a single Next.js app with public `/`, `/work`, `/about`, `/contact`, snapshot publishing, email/password or magic link, inquiries, ZIP bundles, and rate limits. An audit of maser-lab showed a frontend-only lab (`lab/` Next 16 app, no Supabase). An audit of `masermediagroup-stack/maser-media` showed that https://masermedia.co already has those marketing routes and hardcoded `/work` case pages.

A grilling session locked a different foundation. This ADR records it so later phases do not rebuild the spec as written.

## Decision

1. **Dedicated GitHub repository** `masermediagroup-stack/maserpresent`. Maser-lab Phase 0 was a docs packet only. No CMS workspace inside the lab.
2. **Headless attach to masermedia.co.** Maserpresent is studio + preview. maser-media serves the client deck. See ADR 0004 for private `/p/[slug]` vs public `/work/[slug]`.
3. **Existing `/work` file routes stay.** Helm and Main Street are not migrated. **Published** CMS projects **do** join the Work index (ADR 0004).
4. **Live rows.** No `project_snapshots`. `draft` is studio-only. `review` is live on `/p/[slug]`. `published` is live on `/work/[slug]`. Flip back to `review` to take a piece off Work while revising with the client.
5. **Magic link, invite-only.** No passwords. Admin must create `profiles` before a session exists.
6. **Studio host:** Vercel URL in MVP. **Client host:** masermedia.co (`/p/` private, `/work/` public). Optional `/present/[token]` on studio is extra-secret, not the client destination.
7. **Curated maser-lab skills** in this repo (workflow), not the entire skill inventory.
8. **MVP cuts:** no inquiries, no ZIP, no rate limits, no Maserpresent marketing shell, no snapshots.
9. **Product name:** Maserpresent (ADR 0002).
10. **Client viewer:** 16:9 deck with side arrows and bottom chapter tabs (ADR 0003).

Stack for Phase 1 init: Next 16.2.9, React 19.2.4, Tailwind 4, shadcn base-nova + `@base-ui/react`, Motion, Supabase JS 2.112.x + `@supabase/ssr` 0.12.4, Zod, RHF, TipTap 3, dnd-kit 6.3.x, Vitest + RTL, Playwright. Product name isolated in `src/config/product.ts`. Convex is rejected (spec and this ADR require Supabase).

## Considered options

| Topic | Rejected | Why |
| --- | --- | --- |
| Sibling `casework/` in maser-lab | Q1 A | Mixes secrets, public URLs, and a CMS lockfile with a UI lab. Root `vercel.json` already builds only `lab/`. |
| Convert maser-lab into the CMS | Q1 C | Destroys the lab. |
| Lab demo only | Q1 D | Not a production in-house app. |
| This app *is* the public studio site | Q2 A | masermedia.co already is. |
| Reverse-proxy `/present/[token]` through masermedia.co | Q6 B, Q14 B | Draft and cookie leak onto the marketing CDN. Private **slug** `/p/` is a different, intentional review surface (ADR 0004). |
| Reuse Helm/Main Street `/work/[slug]` file routes for CMS | Q10 A | Collides with hardcoded pages. **New** CMS slugs may use `/work/[slug]` (ADR 0004). |
| Duplicate renderer in maser-media | Q11 B | Will drift. |
| Iframe this app on masermedia.co | Q11 C | Weak SEO, extra origin. |
| Copy every maser-lab skill | Q13 A | Convex/Firebase/HF skills fight Supabase. |
| Email/password | Q4 A | Studio chose magic link. |
| Snapshot on publish | Q3 B | Studio chose live rows + unpublish-to-edit. |
| Inquiries / ZIP / rate limits in MVP | Q15–18 other options | Cut to keep v1 to authoring, review, and unlisted publish. |

## Consequences

- Phase 1+ happens in this repo. maser-lab must not scaffold this app.
- maser-media needs later PRs for `/p/[slug]`, CMS `/work/[slug]`, and Work index cards. Until then, copied URLs 404 on production.
- Unpublish (back to `review`) removes the piece from Work; the private slug works again. There is no rollback of the last public cut.
- Original spec phases 7–8: Work listing of **published** CMS projects is in scope on maser-media (ADR 0004). Inquiry admin stays on the existing contact form.
- Passcode and magic-link brute force are **unprotected** until rate limits are added. Do not treat wide client sharing as safe.
- Font uploads (`woff2`/`woff`) are in scope; ZIP bundles are not.

## Assumptions

- Northline is fictional; demo metrics stay labeled as demo.
- Studio identity on masermedia.co remains Maser Media; Maserpresent chrome can say “Maserpresent” internally.
- Seed users are two invited emails, not committed secrets.
- Unlisted `/p/[slug]` is the **review** surface (`noindex`). Public listing is `/work` after approval (ADR 0004).

## Open decisions (not blocking Phase 0)

- Whether public `/work/[slug]` defaults to indexable (ADR 0004 default: yes) or stays `noindex` until an SEO pass.
- Whether `/p/[slug]` after publish is a 301 (ADR 0004 default) or a silent alias.
- Cloudinary (storage adapter is ready; not wired).
- Rate-limit vendor when that phase is approved (Postgres vs Upstash).
- Custom studio domain (`studio.masermedia.co`).

Closed: GitHub repo name (`maserpresent`). Client chrome (deck + tabs). Hosting (private `/p/` → public `/work/`).

## Evidence

- maser-lab: `package.json` workspaces `lab`, `packages/*`; `vercel.json` → `lab/.next`; no Supabase; 12 shadcn primitives. PR #53.
- maser-media: homepage `https://masermedia.co`; `next-app/src/app/work/*` file routes.
- This repo (2026-08-16): empty app; nested Casework-named handoff; root README `# maserpresent`.
- Grilling rounds 1–4, 2026-08-13 (Q1–Q19).
- Figma deck mock: file `VvdoL70x1fU36JZ3rmh0W7`, node `1:2`.

Approver: human (Tyler / Maser Media), via grilling answers plus the Figma client-view direction.
