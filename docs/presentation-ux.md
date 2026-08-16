# Maserpresent — Client presentation UX

Source of truth for studio preview, optional `/present/[token]`, and masermedia.co `/p/[slug]` (review) plus `/work/[slug]` (published). Companion ADRs: [0003-presentation-chrome.md](./decisions/0003-presentation-chrome.md), [0004-hosting-and-visibility.md](./decisions/0004-hosting-and-visibility.md).

Figma (first slide, 16:9): [Untitled, node 1:2](https://www.figma.com/design/VvdoL70x1fU36JZ3rmh0W7/Untitled?node-id=1-2) — `fileKey` `VvdoL70x1fU36JZ3rmh0W7`.

Do not treat the Figma file as a marketing page. It is the **client deck shell**. Project content (logo, type specimens, photography) fills the stage; chrome stays minimal.

## Layout

```text
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  [←]              STAGE (the work)                 [→]  │
│                                                         │
├──────────┬──────────┬──────────┬──────────┬─────────────┤
│ Chapter  │ Chapter  │ Chapter  │ Chapter  │ Chapter     │
│  tab     │  tab     │  tab     │  tab     │  tab        │
└──────────┴──────────┴──────────┴──────────┴─────────────┘
```

Measured from the mock (1920×1080):

| Token | Value |
| --- | --- |
| Frame | 1920×1080 (16:9) |
| Stage background | `#ffffff` |
| Stage copy | `#151515`, Inter-like, 24px for captions such as “Welcome to” |
| Bottom bar | `#222222`, height 92px, full width, y=988 |
| Tab count in mock | 5 equal columns (~384px), 1px vertical dividers |
| Tab label | `#fafafa`, Inter Regular, 24px, centered |
| Next control | 52px circle, light gray fill, dark arrow, vertically centered in the stage (not the bar) |
| Previous control | Same component, mirrored on the left; **omitted on slide 1** |

## Navigation model

1. A presentation is an ordered list of **slides**, grouped into **chapters**.
2. **Next / previous** (click, swipe, `ArrowRight` / `ArrowLeft`, optional space) move one slide in deck order, including across chapter boundaries.
3. **Bottom tabs** are chapters. Clicking a tab jumps to **slide 1 of that chapter**.
4. The tab for the chapter that contains the current slide is **active**.
5. Swipe and arrow navigation must update the active tab when the chapter changes.

### Arrow rules

- Slide 1 of the deck: show **next only** (as in the Figma).
- Last slide: show **previous only**.
- Otherwise: both.
- Hit area at least 44×44px; visible circle may stay 52px on desktop.
- `aria-label` “Previous slide” / “Next slide”. Do not rely on color alone.

### Tab rules

- **Active:** darker background than `#222` (use a token such as `#151515` or `color-mix` on the bar color). Label stays `#fafafa`.
- **Hover (pointer, not touch):** underline the label. No grow, no color shift required.
- **Focus-visible:** keyboard ring on the tab, independent of hover/active.
- **Current:** `aria-current="page"` (or `true`) on the active tab.
- Tabs that do not fit (mobile, many chapters): horizontal scroll inside the bar, no wrap to two rows in MVP.
- Hidden chapters (`is_visible = false`) do not appear as tabs and their slides are skipped in the deck.

### Example chapter set (brand identity)

From the Figma, as an **optional starter template** for identity projects — not hardcoded product IA:

1. Typography
2. Logo
3. Brand Design
4. Do’s and Don’ts
5. Look Book

Case studies may use Context, Challenge, System, Applications, Outcomes, Credits, and so on. Editors rename, reorder, omit, and add chapters.

## Motion

- Default: a short horizontal slide or fade between slides (project theme `transition style`).
- `prefers-reduced-motion: reduce`: instant cut, no swipe physics.
- Motion must not be required to understand which section is active (tabs and arrows stay).

## Assets route

`/p/[slug]/assets` (and `/work/[slug]/assets` if downloads stay allowed after publish) is a library, not a slide. Keep the same bottom identity (studio mark / exit) but do not fake the five Figma tabs as asset filters. Asset filters stay kind/tag controls. A control should return the viewer to the current slide.

## Out of chrome

- No card grid around the stage.
- No oversized marketing headings in the shell.
- No second nav at the top in MVP besides an optional studio mark and close/back if needed for nested views.
- Do not imitate the Maser Media wordmark as product UI; that mark is **slide content** in the mock.

## Implementation phases

| Phase | What to build |
| --- | --- |
| 1 | Static shell: white stage, bottom bar with placeholder tabs, next arrow, tokens. No data. |
| 5 | Authoring: chapters as tabs, slides inside chapters, preview uses the same chrome. |
| 6 | Live renderer: arrows, swipe, keyboard, active/hover/focus tab states, reduced motion, three layout modes *per slide*. |
| 7 | `/p/[slug]` for review and `/work/[slug]` for published, via maser-media + this renderer. Optional studio `/present/[token]`. |
