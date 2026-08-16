# Maserpresent

In-house case-study and brand-identity authoring for Maser Media. Clients review a private masermedia.co slug; after approval the piece is listed on Work.

This repository starts as a **Phase 0** decision packet. There is no application yet.

Read in order:

1. [docs/product-brief.md](docs/product-brief.md)
2. [docs/architecture.md](docs/architecture.md)
3. [docs/presentation-ux.md](docs/presentation-ux.md)
4. [docs/decisions/0001-foundation.md](docs/decisions/0001-foundation.md)
5. [docs/decisions/0002-product-name.md](docs/decisions/0002-product-name.md)
6. [docs/decisions/0003-presentation-chrome.md](docs/decisions/0003-presentation-chrome.md)
7. [docs/decisions/0004-hosting-and-visibility.md](docs/decisions/0004-hosting-and-visibility.md)
8. [docs/build-status.md](docs/build-status.md)

Next approved step is **Phase 1**: Next.js app shell, studio and presentation route groups, design tokens, primitives, and a static deck chrome placeholder. Do not implement Maserpresent inside maser-lab.

Client URLs live on masermedia.co: private `https://masermedia.co/p/[slug]` for review, then public `https://masermedia.co/work/[slug]` after approval. Studio authoring lives here. Deck chrome: [docs/presentation-ux.md](docs/presentation-ux.md).
