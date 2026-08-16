# Product and repository are named Maserpresent

The dedicated CMS repository is `masermediagroup-stack/maserpresent`. The working product name is **Maserpresent**, isolated in configuration so copy, metadata, and emails can change later without a rename sweep of identifiers.

Status: accepted (2026-08-16)

## Context

ADR 0001 left the GitHub repo name open (`casework` vs other). A human created `masermediagroup-stack/maserpresent` and uploaded the maser-lab Phase 0 handoff under `casework-handoff/casework/`, still titled Casework. The original spec also used Casework as the working name.

## Decision

1. Product display name: **Maserpresent**.
2. Config slug: `maserpresent` (`src/config/product.ts` in Phase 1).
3. Renderer package: `@maser/maserpresent-renderer` in `packages/maserpresent-renderer`.
4. Env: `NEXT_PUBLIC_PRODUCT_NAME=Maserpresent`.
5. Keep English **case study** where it names the content genre (chapters, blocks, narrative). Do not rewrite that phrase to “maserpresent.”
6. ADR 0001 remains accepted. This ADR only closes the name.

## Consequences

- All Casework identifiers in this repo are rewritten in Phase 0.
- maser-lab PR #53 docs may still say Casework; this repo is the implementation source of truth.
- Studio chrome may say Maserpresent; public masermedia.co identity remains Maser Media.
