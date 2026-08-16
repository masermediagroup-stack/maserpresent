# Maserpresent

In-house case-study and brand-identity authoring for Maser Media. Clients review a private masermedia.co slug; after approval the piece is listed on Work.

**Phase 1** ships the Next.js app shell: studio route group, presentation deck chrome placeholder, design tokens, and primitives. Supabase and live CMS data arrive in Phase 2+.

## Quick start

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000/studio](http://localhost:3000/studio) for the studio shell, or [http://localhost:3000/present/demo](http://localhost:3000/present/demo) for the static 16:9 deck chrome.

## Scripts

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start Next.js dev server |
| `pnpm build` | Production build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript |
| `pnpm test` | Vitest unit tests |
| `pnpm test:e2e` | Playwright smoke tests |
| `pnpm format` | Prettier |

## Product docs

1. [docs/product-brief.md](docs/product-brief.md)
2. [docs/architecture.md](docs/architecture.md)
3. [docs/presentation-ux.md](docs/presentation-ux.md)
4. [docs/decisions/0001-foundation.md](docs/decisions/0001-foundation.md)
5. [docs/decisions/0002-product-name.md](docs/decisions/0002-product-name.md)
6. [docs/decisions/0003-presentation-chrome.md](docs/decisions/0003-presentation-chrome.md)
7. [docs/decisions/0004-hosting-and-visibility.md](docs/decisions/0004-hosting-and-visibility.md)
8. [docs/build-status.md](docs/build-status.md)

## Hosts

- **Studio + preview:** this app (`NEXT_PUBLIC_STUDIO_ORIGIN`, Vercel in MVP)
- **Client private:** `https://masermedia.co/p/[slug]` (Phase 7, maser-media)
- **Client public:** `https://masermedia.co/work/[slug]` (Phase 7, maser-media)

Do not implement Maserpresent inside maser-lab.
