# Client presentation is a 16:9 deck with section tabs

Clients opening a Maserpresent link on masermedia.co see a full-bleed slide deck: the work fills the stage, circular prev/next controls sit on the left and right edges, and a dark bottom bar of chapter tabs jumps to the first slide of a section. This replaces a long-scroll article as the default `/p/[slug]` and `/work/[slug]` chrome.

Status: accepted (2026-08-16)

Reference: [Figma, node 1:2](https://www.figma.com/design/VvdoL70x1fU36JZ3rmh0W7/Untitled?node-id=1-2) (`fileKey` `VvdoL70x1fU36JZ3rmh0W7`). Spec: [presentation-ux.md](../presentation-ux.md).

## Context

The original spec described an editorial scrolling page (full-bleed media alternating with reading columns, chapter progress in a minimal top nav). The studio’s first client-facing mock is a **brand-guidelines deck**:

- 1920×1080 stage, white canvas
- Centered work (example: “Welcome to” / Maser Media wordmark / “By MaserMedia”)
- Right-edge circular next control on the first slide (no previous control)
- Bottom bar `#222`, ~92px, five equal tabs with 1px dividers: Typography, Logo, Brand Design, Do’s and Don’ts, Look Book
- Tab labels Inter-like 24px `#fafafa`

The author asked for: arrows on both sides after the first slide; tab click jumps to the first page of that section; active section uses a darker tab background; hover is a simple text underline; swipe and click stay in sync with the highlighted tab.

## Decision

1. **Deck is the client chrome** for studio preview, masermedia.co `/p/[slug]` (review), `/work/[slug]` (published), and optional studio `/present/[token]`.
2. **Chapters = bottom tabs.** Editors name them. The Figma labels are a brand-identity starter set, not a hard-coded product IA.
3. **Slides = pages inside a chapter.** Left/right/swipe/keyboard move between slides in presentation order. Tab click goes to slide 1 of that chapter.
4. **Active tab:** darker background than the rest of the bar. **Hover (pointer devices):** underline the tab label. Keyboard focus remains visible independently.
5. **Arrow visibility:** hide previous on the first slide of the whole deck; hide next on the last. Do not leave a disabled ghost control that looks tappable.
6. **Layout modes** (Editorial / Immersive / Systematic) still theme how a *slide* composes blocks. They do not restore long-scroll as the default viewer.
7. Add a `slides` table in Phase 2 (see architecture). Blocks belong to a slide.

## Considered options

| Option | Rejected | Why |
| --- | --- | --- |
| Long-scroll article as default client view | Original spec | Conflicts with the approved Figma and the “open a Maserpresent link” journey |
| Hard-code the five Figma tab labels | Convenience | Case studies need different chapters; tabs are data |
| Show both arrows on slide 1, disabled | Visual completeness | First-slide mock shows only next; empty previous control is clutter |
| Tab highlight = underline only | Simpler CSS | Author asked for darker active background; underline is hover |

## Consequences

- Phase 1 can ship a static deck shell (tabs + one arrow) without data.
- Phase 5 authoring must edit slides, not only a vertical block list.
- Phase 6 implements motion, reduced-motion, swipe, and tab state.
- Mobile is a deliberate 16:9-or-fitted composition with swipe; bottom tabs may scroll horizontally when they do not fit.
- Studio UI stays compact and operational; it does not copy this deck chrome.
