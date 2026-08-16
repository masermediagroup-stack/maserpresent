# Maserpresent — Agent instructions

**Maserpresent** is Maser Media’s case-study and brand-identity CMS: studio authoring here; private client slug and public Work pages on masermedia.co.

This is not maser-lab. Do not scaffold lab demos, dither engines, or a second app inside a lab.

## Product docs (load first)

- `docs/product-brief.md`
- `docs/architecture.md`
- `docs/presentation-ux.md`
- `docs/decisions/0001-foundation.md`
- `docs/decisions/0002-product-name.md`
- `docs/decisions/0003-presentation-chrome.md`
- `docs/decisions/0004-hosting-and-visibility.md`
- `docs/build-status.md`

Work **one phase at a time**. Stop for approval after each phase. Phase 0 is done. Phase 1 is the first code phase.

## Skills to load

| Task | Load |
| --- | --- |
| Any product UI | `.agents/skills/maser-lab-web/SKILL.md` (Shape / Implement / Review / Harden) |
| End-to-end verification | `.agents/skills/verification/SKILL.md` |
| Accessibility | `.agents/skills/web-design-guidelines/SKILL.md` |
| Primitives | `.agents/skills/shadcn/SKILL.md` |
| React/Next performance | `.agents/skills/vercel-react-best-practices/SKILL.md` |
| Composition | `.agents/skills/vercel-composition-patterns/SKILL.md` |
| Motion review | `.agents/skills/review-animations/SKILL.md` |
| Motion craft | `.agents/skills/ui-animation/SKILL.md`, `.agents/skills/emil-design-eng/SKILL.md` |
| Expressive UI | `.agents/skills/frontend-design/SKILL.md` |

Ignore maser-lab-web routes that point at lab-only skills (project scaffold, demo-chrome, dither, Three.js, export to portfolio). Follow `docs/architecture.md` instead.

Do **not** use Convex, Firebase, or Hugging Face skills. Backend is Supabase.

## Hosts

- Studio + preview: this app (`studioOrigin`, Vercel URL in MVP)
- Client private: `https://masermedia.co/p/[slug]` (`status = review`)
- Client public: `https://masermedia.co/work/[slug]`, listed on `/work` (`status = published`)
- Do not build a Maserpresent marketing `/`, `/about`, or `/contact`

## Product name

Read `src/config/product.ts` once it exists. Until Phase 1, the working name is **Maserpresent**. Keep the name in configuration. English “case study” still means the content type.

## Presentation chrome

Client and unlisted viewers see a **deck**, not a long-scroll article. Source of truth: `docs/presentation-ux.md` and Figma `VvdoL70x1fU36JZ3rmh0W7` node `1:2`.
