# AGENTS.md

## What this is
notes. — a tiny Astro static site that turns files in `src/pages/` into published
pages and auto-generates folder listings. Static output, deployed to Vercel.

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

## Code layout
- `src/layouts/` — `Layout.astro` (html shell, head/meta), `NoteLayout.astro` (header/footer wrapper)
- `src/components/` — `Header.astro`, `Footer.astro`, `utils/Icons.astro`
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
- Theme (light/dark/digital) and font (serif/mono/sans) prefs are stored client-side;
  logic in `src/scripts/actions/`.

## Watch out
- Everything in `src/pages/` is publicly served once deployed. `indexable: false` only
  hides pages from search engines — it does **not** make them private. Keep secrets out
  of the repo.
- `.claude/` is gitignored.
