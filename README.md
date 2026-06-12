# notes.

![Vercel](https://vercelbadge.vercel.app/api/qurle/notes?style=flat) ![Static Badge](https://img.shields.io/badge/just-files-white?style=flat)

Tiny [Astro](https://astro.build) site that turns a folder of files into your personal notes storage. Inspired by [type.baby](https://type.baby).

![Look of notes homepage](.github/hero-image.png)
<!-- TODO: add hero screenshot to .github/hero-image.png -->

### Drop a file, get a page
No config, no database, no admin panel. Put a `.md`, `.mdx`, `.astro` or `.html` file into `src/pages/` — and it's published. That's it. That's the whole workflow.

### Folders are pages too
Nest your notes however your brain likes. Every folder becomes a navigable listing, generated automatically. Two notes or two hundred — the structure just follows you.

```
src/pages/
├── films/
│   ├── blade-runner.md
│   ├── 2001.mdx
│   └── directors/
│       ├── lynch.md
│       └── kubrick/
│           └── full-metal-jacket.md
├── music/
│   ├── radiohead.md
│   └── genres/
│       └── post-rock.md
├── science/
│   ├── fractals.astro
│   └── quantum.md
└── personal/
    ├── setup.md
    └── notes/
        └── coffee.md
```

### Hands on keyboard
Browse like it's a file manager. Arrow keys move between entries, Escape or backspace takes you back. Mouse is optional, honestly.

### Make it yours
Switch fonts (serif / mono / sans) and themes (light / dark / digital) to find the look that feels like home. Your choice is remembered.

![Example of switching font and theme](.github/appearance.png)
<!-- TODO: add appearance screenshot to .github/appearance.png -->

### Any content you like
Markdown and MDX are styled automatically, zero extra steps. Astro pages get the same look — just wrap them in `NoteLayout`:

```astro
---
import NoteLayout from '@layouts/NoteLayout.astro'
---
<NoteLayout>your content</NoteLayout>
```

HTML pages are listed and served as-is, no styling applied. Raw and proud.

### Under the hood
Fronted by [Astro](https://astro.build), deployed on [Vercel](https://vercel.com). Icons by [astro-icon](https://www.astroicon.dev/) with [Material Symbols](https://fonts.google.com/icons).

---
### How do I run it locally
1. Install [Node.js](https://nodejs.org) v22.12.0 or newer (cause you need npm)
2. Download repository
3. Open terminal and run this
```bash
cd <path to folder of notes>
npm i
npm run dev
```
4. Open link from terminal (usually http://localhost:4321/)

**Want to tweak it?** Styles live in `src/styles/`, folder page logic — in `src/pages/[...folder].astro`.

---
Designed and developed by [qurle](https://qurle.net). Inspired by [type.baby](https://type.baby).

Share bugs and ideas via [issues](https://github.com/qurle/notes/issues). Any dialogs are also welcome at [nick@qurle.net](mailto:nick@qurle.net?subject=notes.).
