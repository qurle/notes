---
name: add-note
description: Save an LLM-generated artifact as a published note in this notes. Astro repo. Use whenever the user wants to store, save, publish, drop in, or "add a note/page" from generated content — markdown, MDX, HTML, or a React/Vue/Svelte component — even if they don't name a file type or say the word "note". Picks the right extension, writes it to src/pages/ with a clean filename, wires up any component, and verifies the build.
---

# Add a note

Publish a generated artifact as a page in this Astro site. `AGENTS.md` (repo root) is the
source of truth for how content becomes pages — skim it if anything here is unclear.

## The one rule
Any file in `src/pages/` becomes a page, and nested folders become navigable listings
automatically. So "saving a note" just means writing the artifact to the right place with
the right extension. **Never hand-author folder index/listing pages** — they're generated
by `src/pages/[...folder].astro`.

## Steps

1. **Choose location & name.** Write to `src/pages/`, optionally inside a subfolder to
   group related notes (e.g. `src/pages/research/`). Use **lowercase kebab-case**
   filenames: `gpt-eval-results.md`, not `GPT Eval Results.md`. The route mirrors the path
   — `src/pages/research/gpt-eval-results.md` → `/research/gpt-eval-results`.

2. **Choose the extension by what the content actually is:**

   | Content | Extension | Notes |
   |---|---|---|
   | Prose / docs / notes (plain markdown) | `.md` | Auto-styled via `NoteLayout`; no frontmatter needed. |
   | Markdown that embeds a component or JSX | `.mdx` | Same auto-layout, but can `import` components. |
   | A React / Vue / Svelte component | `.tsx` / `.vue` / `.svelte` **+** an `.mdx` page | Component goes in `src/components/`; the `.mdx` renders it (step 3). |
   | A self-contained HTML doc (own markup/styles) | `.html` | Served raw and unstyled — drop it in as-is. |
   | A custom Astro page | `.astro` | Must wrap content in `NoteLayout` manually. |

   Plain `.md` **cannot** import components — if the artifact needs interactivity, make it
   `.mdx` (or `.astro`).

3. **For a component**, put the source in `src/components/` (lowercase filename) and create
   an `.mdx` page in `src/pages/` that imports it with a hydration directive:

   ```mdx
   import Chart from '@components/chart'

   # Sales chart

   <Chart client:visible />
   ```

   Directives: `client:load` (hydrate immediately), `client:visible` (on scroll — a good
   default), `client:idle` (when the browser is free), or omit it for static HTML with zero
   JS. React, Vue, and Svelte are already installed — no setup needed.

4. **Match the site's look** (optional but nice): keep prose in `.md`/`.mdx` so it inherits
   `NoteLayout`, and style any component with the theme-aware CSS custom properties from
   `src/styles/variables.sass` (`--color-main`, `--space-l`, `--radius-l`, `--font-main`, …)
   rather than hardcoded values — that's what lets it follow the light/dark/digital themes.
   `src/components/examples/scratchpad.tsx` is a worked example.

5. **Verify.** Run `npm run build` (must compile cleanly), or `npm run dev` to preview at
   the new route.

## Conventions
- Prefer path aliases over relative imports: `@components/*`, `@layouts/*`, `@styles/*`,
  `@scripts/*`, `@pages/*`, `@settings`.
- Everything in `src/pages/` is publicly served once deployed — don't save secrets.
- `src/pages/examples/` is demo content shipped with the template; real notes can live
  anywhere else under `src/pages/`.
