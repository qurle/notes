# AGENTS.md

## What this is
notes. — a tiny Astro static site that turns files in `src/pages/` into published
pages and auto-generates folder listings. Static output, deployed to Vercel.

A common use is a **store for LLM-generated artifacts**: clone the repo, drop generated
files into `src/pages/`, and they're published as styled, navigable notes.

## Saving an artifact (the most common task)
Usually the job is: take a generated artifact and publish it as a note.

1. **Location & name** — save it under `src/pages/`, optionally in a subfolder to group
   related notes (folders become navigable listings automatically). Use **lowercase,
   kebab-case** filenames, e.g. `quantum-notes.md`.
2. **Pick the format by content:**
   - Prose / docs / notes → **`.md`** — auto-styled, no frontmatter needed.
   - Markdown that needs a component or JSX → **`.mdx`**.
   - Interactive React / Vue / Svelte → put the component in `src/components/`
     (`.tsx` / `.vue` / `.svelte`), then make an **`.mdx`** page that imports it and adds a
     `client:*` directive. Plain `.md` **cannot** import components.
   - A self-contained page that already has its own HTML/CSS → drop the **`.html`** file in
     as-is; it's served raw and unstyled.
   - A custom Astro page → **`.astro`**, wrapping content in `NoteLayout`.
3. **Don't** hand-author folder index/listing pages — `src/pages/[...folder].astro`
   generates them.
4. To match the site's look, keep prose in `.md`/`.mdx` (inherits `NoteLayout`) and style
   any components with the theme-aware CSS vars (see Conventions).
5. Verify with `npm run dev` (preview) or `npm run build` (must compile cleanly).

## Commands
- Requires Node >= 22.12 (see `package.json` engines), npm.
- `npm i` — install deps
- `npm run dev` — local dev server (usually http://localhost:4321)
- `npm run build` — static build into `dist/`
- `npm run preview` — serve the built output
- There are **no tests and no linter** configured — don't invent `npm test` / `npm run lint`.

## Stack
Astro 6 · TypeScript · SASS (**indented `.sass` syntax, not `.scss`**) · MDX
(`@astrojs/mdx`) · `astro-icon` (Material Symbols). Site config is JSON5 via
`vite-plugin-json5`.

UI-framework islands available out of the box: React 19, Vue 3, Svelte 5
(`@astrojs/react` / `@astrojs/vue` / `@astrojs/svelte`).

## How content becomes pages
- Any `.md`, `.mdx`, `.astro`, or `.html` in `src/pages/` is published. Folders nest into routes.
- `.md` / `.mdx` automatically receive `NoteLayout` via the remark plugin
  `src/remark-plugins/auto-doc-layout.mjs` — no need to set `layout` in frontmatter.
- `.astro` pages must wrap content in `NoteLayout` manually:
  `import NoteLayout from '@layouts/NoteLayout.astro'`.
- `.html` pages are listed and served raw (no styling applied).
- Folder listing/index pages are generated automatically by
  `src/pages/[...folder].astro` — **don't hand-author index pages.**
- `src/pages/examples/` is demo content shipped with the template, not real notes.

## Framework components (islands)
- React (`.tsx`), Vue (`.vue`), and Svelte (`.svelte`) all work. Drop the component into
  `src/components/` and import it into any `.mdx` or `.astro` note.
- Add a hydration directive to make it interactive: `client:load` (immediately),
  `client:visible` (on scroll), `client:idle` (when free) — or omit it for static HTML
  with zero JS.
- Example: `src/components/scratchpad.tsx` (React island) used in
  `src/pages/examples/frameworks.mdx`.

## Code layout
- `src/layouts/` — `Layout.astro` (html shell, head/meta), `NoteLayout.astro` (header/footer wrapper)
- `src/components/` — Astro + framework components: `Header.astro`, `Footer.astro`,
  `utils/Icons.astro`, `scratchpad.tsx` (React island example)
- `src/scripts/` — client-side TS: `navigate.ts` (keyboard nav), `actions/themes.ts`,
  `actions/fonts.ts`, `utils/` (cycle, store, getElements, unique)
- `src/styles/` — SASS partials (reset, variables, global, blocks, ui, header, fonts, digital)
- `src/remark-plugins/auto-doc-layout.mjs` — auto-applies NoteLayout to md/mdx

## Conventions
- Prefer the path aliases over relative imports. Active aliases (from `tsconfig.json` /
  `astro.config.mjs`): `@layouts/*`, `@components/*`, `@scripts/*`, `@styles/*`,
  `@pages/*`, and `@settings`.
- Site config lives in `notes.settings.jsonc` (JSON5 — comments allowed); import via
  `@settings`. Types in `notes.settings.d.ts`.
- Syntax highlighting is intentionally disabled (`astro.config.mjs`).
- Theme (light/dark/digital) and font (serif/mono/sans) prefs are stored client-side and
  applied as `data-theme` / `data-font` on `:root`; logic in `src/scripts/actions/`.
- Style with the theme-aware CSS custom properties from `src/styles/variables.sass`
  (e.g. `--color-main`, `--space-l`, `--radius-l`, `--font-main`) rather than hardcoded
  values — this is what lets components react to theme/font switching. Applies to
  framework islands too (see `scratchpad.tsx`).

## Watch out
- Everything in `src/pages/` is publicly served once deployed. `indexable: false` only
  hides pages from search engines — it does **not** make them private. Keep secrets out
  of the repo.
- `.claude/` is gitignored.
