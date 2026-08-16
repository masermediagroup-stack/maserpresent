# Client URLs live on masermedia.co: private slug, then public `/work`

Studio authors in this app. The client team never uses a Vercel URL as their destination. They open a **private slug on masermedia.co**. After approval, the studio flips the project public and it appears in the site’s **Work** section.

Status: accepted (2026-08-16)

Supersedes ADR 0001 items 2, 3 (listing), 6 (review host), and the assumption that `/p/[slug]` stays unlisted forever. ADR 0001 still stands for: new repo, shared renderer, magic link, live rows, MVP cuts (no ZIP / inquiries / snapshots / rate limits), no CMS inside maser-lab.

## Context

PR #53 put private review on the Maserpresent host (`/present/[token]`) and treated `https://masermedia.co/p/[slug]` as an unlisted public URL that would **not** join `/work` in MVP.

The studio’s actual workflow is:

1. Build and revise the presentation in the Maserpresent backend.
2. Give the client’s team a **private masermedia.co slug** to review the deck.
3. After they approve (and the studio makes any final edits), **make it public** and list it in **Work**.

Drafts that are not ready for the client must still stay off the marketing CDN.

## Decision

1. **Studio host (this app):** `/studio/*`, `/auth/*`, and authenticated **preview**. Drafts (`status = draft`) 404 on masermedia.co.
2. **Client private slug:** `https://masermedia.co/p/[slug]` when `status = review`. Unlisted: `noindex, nofollow`, not in `/work`, not in the sitemap. Optional passcode. Studio edits during review are live on that slug so the client sees updates.
3. **Client public slug:** after approval, `status = published`. Canonical URL is `https://masermedia.co/work/[slug]`. The project is listed on `https://masermedia.co/work`. `/p/[slug]` redirects to `/work/[slug]`. Indexing allowed unless the studio opts out later.
4. **Taking it private again:** set `status` back to `review` (or `draft`). It disappears from `/work`; `/work/[slug]` 404s; `/p/[slug]` works again if still `review`. There is no snapshot/rollback of the last public cut.
5. **Existing file-route case pages stay.** Do not migrate Helm or Main Street. Deny CMS slugs `helm-in-house-saas`, `main-street-pub-grub`, and `work`.
6. **`/present/[token]`** remains on the studio host as an optional extra-secret or preview URL. It is **not** the primary client link. Do not proxy that token through masermedia.co.
7. **maser-media** (later PR) owns `/p/[slug]`, `/work/[slug]` for CMS projects, and adding public CMS rows to the `/work` index. This repo owns authoring and the renderer.

## Lifecycle

```text
draft      studio preview only          masermedia.co 404
review     private client slug          /p/[slug]  noindex  not in /work
published  public work piece            /work/[slug]  listed on /work
archived   removed from public          404
```

## Considered options

| Option | Rejected | Why |
| --- | --- | --- |
| Client reviews on `*.vercel.app/present/[token]` | PR #53 default | Studio wants the client URL on masermedia.co |
| Private and public share `/work/[slug]` | Guessable Work URL while still confidential | Private stays under `/p/` until approved |
| List private projects on `/work` | Breaks “private” | Work is the public portfolio |
| Put drafts on masermedia.co | ADR 0001 CDN/draft leak | Only `review` and `published` hit that host |
| Migrate Helm / Main Street in MVP | Scope | Keep file routes; denylist those slugs |

## Consequences

- Phase 7/8 in this repo must expose Share (copy private `/p/[slug]`, optional passcode) and Make public (flip to `/work`).
- maser-media needs routes for both `/p/[slug]` and CMS `/work/[slug]`, plus Work index cards for `published` projects.
- Until that maser-media PR lands, copied URLs 404 on production; studio UI should say so.
- Guessable private slugs (`acme-rebrand`) are a real risk. Prefer non-marketing slugs for review, optional passcode, and the extra `/present/[token]` when needed.
- Passcode brute force remains unprotected until rate limits exist.

## Open decisions (not blocking)

- Whether `/p/[slug]` after publish is a 301 to `/work/[slug]` (default, this ADR) or stays as an alias without redirect.
- Whether public pages default to indexable or stay `noindex` until a later SEO pass.
