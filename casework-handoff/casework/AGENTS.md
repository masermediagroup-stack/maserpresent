# Casework — Agent instructions

**Casework** is Maser Media’s case-study CMS: studio authoring, private client review, unlisted publish onto masermedia.co.

This is not maser-lab. Do not scaffold lab demos, dither engines, or a second app inside a lab.

## Product docs (load first)

- `docs/product-brief.md`
- `docs/architecture.md`
- `docs/decisions/0001-foundation.md`
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

- Studio + `/present/[token]`: this app (`studioOrigin`, Vercel URL in MVP)
- Published unlisted: `https://masermedia.co/p/[slug]` (maser-media, later PR)
- Do not build Casework `/`, `/work`, `/about`, `/contact`

## Product name

Read `src/config/product.ts` once it exists. Until Phase 1, the working name is Casework.
