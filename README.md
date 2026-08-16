# Maserpresent

In-house case-study and brand-identity authoring, private client review, and unlisted publish for Maser Media.

This repository starts as a **Phase 0** decision packet. There is no application yet.

Read in order:

1. [docs/product-brief.md](docs/product-brief.md)
2. [docs/architecture.md](docs/architecture.md)
3. [docs/presentation-ux.md](docs/presentation-ux.md)
4. [docs/decisions/0001-foundation.md](docs/decisions/0001-foundation.md)
5. [docs/decisions/0002-product-name.md](docs/decisions/0002-product-name.md)
6. [docs/decisions/0003-presentation-chrome.md](docs/decisions/0003-presentation-chrome.md)
7. [docs/build-status.md](docs/build-status.md)

Next approved step is **Phase 1**: Next.js app shell, studio and presentation route groups, design tokens, primitives, and a static deck chrome placeholder. Do not implement Maserpresent inside maser-lab.

Published unlisted URLs will live at `https://masermedia.co/p/[slug]` (thin route in maser-media, later). Studio and `/present/[token]` live here. Client presentation chrome is a 16:9 deck with side arrows and bottom section tabs — see [docs/presentation-ux.md](docs/presentation-ux.md).
