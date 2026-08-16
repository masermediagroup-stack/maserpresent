# Maserpresent — Product brief

Working name: **Maserpresent**. Keep the name in configuration (`src/config/product.ts` in this repo) so it can be changed later. Do not hard-code it through UI copy, metadata, or emails.

This packet is Phase 0 for **this repository** (`masermediagroup-stack/maserpresent`). Implementation starts at Phase 1 here. Do not implement the product inside maser-lab.

Status: Phase 0 complete (decision record). Next: Phase 1 after approval.

## Job

Enable a small creative studio (Maser Media) to turn project strategy, process, outcomes, and brand assets into a polished case study or brand-identity presentation without designing and coding a bespoke page for every client.

Secondary jobs:

- Give clients one trustworthy destination for reviewing a presentation and downloading approved assets.
- Publish an unlisted URL on [masermedia.co](https://masermedia.co) when the studio is ready to share a project outside a review link.
- Preserve enough visual freedom that each project can feel like its own brand.
- Keep authoring fast enough that the team will actually maintain it.

This is not a generic page builder, DAM replacement, social network, or marketing landing-page generator. It is not the Maser Media marketing site. It is a focused authoring, private review, and unlisted publishing system.

## Audiences and roles

### Studio admin

Manages users, clients, global studio appearance, and all projects. Invite-only; no public registration.

### Studio editor

Creates and edits clients, projects, chapters, slides, blocks, assets, preview links, and publication state.

### Client viewer

Opens a private Maserpresent link, moves through a **slide deck** (arrows, swipe, bottom section tabs), and downloads assets explicitly made available to them. No account. Access is a revocable token plus an optional passcode.

### Unlisted visitor

Opens `https://masermedia.co/p/[slug]` for a **published** project. They see the same deck renderer. They are not promised a work index, related-work rail, or inquiry form in MVP. If the project is not `published`, this URL 404s.

The original “public visitor / prospect conversion” audience is served by the existing [maser-media](https://github.com/masermediagroup-stack/maser-media) site (`/`, `/work`, `/about`, `/contact`). Maserpresent does not replace that site.

## Core principles

1. **The work is the spectacle.** Interface chrome recedes; imagery, motion, typography, and applications carry the experience.
2. **Narrative before gallery.** Every project should explain client context, challenge, strategic idea, system, applications, and outcome — or, for identity work, type, logo, system, usage, and look book.
3. **Proof over adjectives.** Show the system working across touchpoints. Include outcomes, testimony, or metrics where available. Label demo metrics as demo.
4. **Structured freedom.** Authors compose from dependable blocks on slides. Project-level theme tokens create distinct presentations.
5. **Two reading speeds.** A visitor can scan title, thesis, and hero quickly; a client or design-minded reader can move through every slide.
6. **Motion demonstrates behavior.** Animation reveals how an identity works, including slide transitions. Respect `prefers-reduced-motion`.
7. **Private means private.** Drafts, review links, and source assets never leak into masermedia.co, search indexes, or generated metadata.
8. **Fast by default.** Large media must not turn the presentation into a loading screen.

## Research-informed presentation model

Translate editorial patterns, do not imitate trade dress:

- Broad proof of identity across real applications, with credits (Pentagram-like structure).
- Strategic narrative and impact (COLLINS-like structure).
- Direct chapter language from challenge to change (Ragged Edge-like structure).
- Project-specific visual experience (Base Design-like structure).
- Decomposition of a brand system into type, color, motion, and other behaviors (Gretel-like structure).
- Motion and responsive behavior as part of the identity (DIA-like structure).

Do not copy any studio’s typography, layout, or copy.

Client chrome is a **deck**, not a long-scroll article. See [presentation-ux.md](./presentation-ux.md) and [0003-presentation-chrome.md](./decisions/0003-presentation-chrome.md).

## Required user journeys (MVP)

### Internal authoring

Sign in (magic link) → dashboard → create or choose client → create project → enter overview → select presentation theme → add chapters (bottom tabs) → add/reorder slides and content blocks → upload and organize assets → preview desktop/mobile deck → create private review link → publish (unlisted `/p/[slug]` on masermedia.co) → copy that URL.

### Client presentation

Open `https://<studioOrigin>/present/[token]` → optional passcode → see the first slide (work on a white stage; **next** arrow only) → advance with arrows, swipe, or keyboard → use bottom tabs to jump to the first slide of a section (active tab = darker background; hover = label underline) → open approved asset library → filter by type → inspect usage notes → download individual approved files.

### Unlisted published read

Open `https://masermedia.co/p/[slug]` → same deck if `published` → 404 if not published.

Prospect conversion (work index → related work → inquiry) is **out of Maserpresent MVP**. It remains on masermedia.co as it exists today.

## Information architecture

### Maserpresent app (`studioOrigin`, Vercel URL in MVP)

```text
/auth/sign-in
/studio
/studio/clients
/studio/clients/[clientId]
/studio/projects/new
/studio/projects/[projectId]/overview
/studio/projects/[projectId]/story
/studio/projects/[projectId]/assets
/studio/projects/[projectId]/sharing
/studio/projects/[projectId]/settings
/studio/settings
/studio/design-system          # development reference only
/present/[token]
/present/[token]/assets
```

Project editor: stable left rail (Overview, Story, Assets, Sharing, Settings). Save status and Preview in the top bar. Avoid card-heavy dashboard composition.

### masermedia.co (existing site; thin route added later)

```text
/p/[slug]                      # unlisted published Maserpresent project
```

Existing routes stay as they are: `/`, `/work`, `/work/helm-in-house-saas`, `/work/main-street-pub-grub`, `/about`, `/contact`. Do not migrate those case pages into Maserpresent.

### Not in Maserpresent MVP

```text
/
/work
/about
/contact
```

## Case study / identity anatomy

Default chapter ideas; editors may rename, reorder, or omit. Bottom tabs are whatever chapters they publish.

**Brand-identity starter (from the Figma mock):** Typography, Logo, Brand Design, Do’s and Don’ts, Look Book.

**Case-study starter:** Hero/cover, Snapshot, Context, Challenge, Strategic idea, Identity system, Applications, Process, Outcomes, Credits.

Do not force every project into a rigid Challenge/Solution/Results essay. Slides hold blocks; chapters hold slides.

## Content block system

MVP block types (composed onto slides):

| Type | Purpose |
| --- | --- |
| `text` | Eyebrow, heading, rich text, width, alignment. |
| `quote` | Quotation, attribution, role, emphasis style. |
| `stat` | One to four metrics with value, label, optional context. |
| `image` | Media, alt text, caption, fit, focal point, width. |
| `imagePair` | Two media items with independent captions and adjustable ratio. |
| `gallery` | Two to six media items using curated grid presets (not masonry). |
| `video` | Hosted file or approved embed, poster, caption, muted-loop controls. |
| `colorPalette` | Named swatches with HEX/RGB/CMYK/Pantone where supplied. |
| `typeSpecimen` | Family, styles, sample copy, optional font asset metadata. |
| `logoShowcase` | Primary/secondary marks on controlled light/dark backgrounds. |
| `beforeAfter` | Accessible toggle or draggable comparison with labels. |
| `chapterBreak` | Short title and optional media background (often a full slide). |
| `assetShelf` | Selected downloadable assets surfaced inside the narrative. |

Block requirements:

- Drag to reorder with keyboard-accessible alternatives (within a slide and across slides).
- Duplicate, hide, delete with confirmation, and move between slides/chapters.
- Autosave after a short debounce; Saving / Saved / Error status.
- Desktop and mobile preview using the **same deck renderer** as `/present` and `/p/[slug]`.
- Every media item requires alt text or an explicit decorative flag.
- Constrained variants. No free-position canvas in MVP.
- Hidden blocks do not appear in preview, `/present`, or `/p/[slug]`.

Validate `content` and `style` with a discriminated Zod/TypeScript schema keyed by block type.

## Visual direction

### Studio UI

Calm, precise, operational. Neutral white/near-black with one configurable studio accent. Compact controls, 1px dividers, radii 4–8px. Lucide icons. Clear sans-serif UI typeface. No cards-in-cards. No oversized marketing headings.

### Published / presented deck

Editorial and media-led **slides**. Full-bleed stage; chrome is arrows + bottom tabs. Project theme tokens: background, foreground, accent, display font, body font, media radius, transition style.

Three layout modes from the same content, applied per slide:

```text
Editorial   = text-image pacing; strategy-rich work.
Immersive   = larger media, cinematic chapter breaks; motion and campaign work.
Systematic  = precise grids and specimens; identity systems and asset libraries.
```

Brand typography is optional and scoped to the project route (uploaded font assets). If custom fonts fail, the UI remains readable.

Navigation is the deck chrome in [presentation-ux.md](./presentation-ux.md). Mobile is a deliberate composition, not a scaled desktop page.

## Publish and edit rules

- `status = published` is what `https://masermedia.co/p/[slug]` reads (live row, no snapshot).
- To change a published project without showing mid-edit work: set status to `draft` or `review` (the public URL 404s), edit, then publish again. There is no previous public version to roll back to.
- Private `/present/[token]` links continue to work on draft and review projects while they remain active, unexpired, and unrevoked.
- Drafts and review links use `noindex, nofollow` and are excluded from any sitemap.

## Seed project

**Northline Public Market** — fictional regional food hall repositioned as a civic gathering place. Used to exercise every major presentation block **and** the deck chrome (multiple chapters, multiple slides, arrows, tab highlight).

- Challenge: strong vendors, but the market felt fragmented and transactional.
- Strategic idea: “The city meets here.”
- System: modular wordmark, bold civic typography, vendor color families, documentary photography, practical wayfinding, event-led motion.
- Applications: exterior signage, vendor stalls, reusable packaging, event posters, social templates, website, wayfinding.
- Outcomes: explicitly labeled **demo metrics**, not real client evidence.

Also seed at least one **identity-style** chapter set matching the Figma labels (Typography, Logo, Brand Design, Do’s and Don’ts, Look Book) so the bottom bar can be tested with realistic tab copy. That set may live on Northline or a second seed project if one project cannot honestly carry both narratives.

Seed media is checked into this repo (clearly licensed local files) with meaningful alt text. No remote hotlinks.

## Non-goals (MVP)

- Replacing masermedia.co marketing pages or the current `/work` index.
- Migrating Helm or Main Street case pages into Maserpresent.
- Inquiry capture, related-work rails, or a Maserpresent-owned contact page.
- ZIP bundles of assets.
- Rate limiting (known limitation — see architecture).
- Published snapshots / rollback of a previous public cut.
- Long-scroll article as the default client viewer (deck is default; see ADR 0003).
- Inline client comments, Figma/Adobe/Drive sync, multi-studio tenancy, full DAM, AI copy, PDF export, custom domains per client, realtime multi-user editing, arbitrary CSS.

## Definition of done (MVP)

A studio editor can create a client, upload media (including project fonts), assemble a coherent presentation from chapters, slides, and structured blocks, preview the deck at multiple sizes, share a private Maserpresent link with selected individual downloads, publish an unlisted `https://masermedia.co/p/[slug]` page, and unpublish to edit without leaking drafts to that URL. A client can move through slides with arrows, swipe, and section tabs, with the active tab matching the current chapter. The Northline seed demonstrates the complete block set. The experience must be secure enough for private review, accessible, responsive, and visually strong.

Phase-by-phase checklist: [build-status.md](./build-status.md). Architecture: [architecture.md](./architecture.md). Presentation chrome: [presentation-ux.md](./presentation-ux.md).
