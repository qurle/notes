# notes.

![Vercel](https://vercelbadge.vercel.app/api/qurle/notes?style=flat) ![Static Badge](https://img.shields.io/badge/just-code-white?style=flat)

A simple [Astro](https://astro.build) page storage inspired by [type.baby](https://type.baby).

**Simple** — drop a file, get a page. No config required.  
**Keyboard-friendly** — navigate with arrow keys, go back with backspace.  
**Scalable** — nest folders in your way, the structure follows automatically.

[![Look of notes homepage](.github/hero-image.png)](https://notes.qurle.net)

Add `.md`, `.mdx`, `.astro`, or `.html` files to `src/pages/` and organize them into subfolders however you like. The site automatically generates a navigable directory listing for every folder.

- **Markdown / MDX** — styled automatically, no extra steps
- **Astro pages** — wrap your content in `NoteLayout` to get the same styling:
  ```astro
  ---
  import NoteLayout from '@layouts/NoteLayout.astro'
  ---
  <NoteLayout>your content</NoteLayout>
  ```
- **HTML pages** — listed and served as-is, no styling applied

```
src/pages/
├── films/
│   ├── blade-runner.md
│   ├── 2001.mdx
│   └── directors/
│       └── lynch.md
└── personal/
    ├── setup.md
    └── notes/
        └── coffee.astro
```

## Run locally

1. Install [Node.js](https://nodejs.org) (v22.12.0 or newer)
2. Download this repository
3. Open terminal in the project folder and run:
   ```sh
   npm install
   npm run dev
   ```
4. Open the link from the terminal (usually [http://localhost:4321](http://localhost:4321))

## Customization

- **Styles** — `src/styles/`
- **Folder page logic** — `src/pages/[...folder].astro`

## License

[GPL-3.0](LICENSE)

---
### How do I run it locally
1. Install [Node](https://nodejs.org) (cause you need npm)
2. Download repository
3. Open terminal and run this
```bash
cd <path to folder of notes.>
npm i
npm run dev
```
4. Open link from terminal (usually http://localhost:4321/)

### Make it yours.
Everything lives in one file — `notes.settings.jsonc` in the project root. No admin panel.

| Setting | What it does |
| --- | --- |
| `title` | Your site's name — the browser tab and the title suffix |
| `description` | Default page description, for meta tags and link previews |
| `appearance` | Starting `theme` / `font` and whether their switcher buttons show |
| `indexable` | `false` tags every page `noindex` so search engines skip it — flip to `true` to go public |
| `footer` | Show / hide the footer and set its links |

**One privacy caveat:** `indexable` only hides you from search — everything in `src/pages/` is still served to anyone who has the link. Keep truly private things out of the repo.

If you want to edit styles, welcome to `src/styles/`. Folder page logic lives in `src/pages/[...folder].astro`.

---
Designed and developed by [qurle](https://qurle.net). Inspired by [type.baby](https://type.baby).

Share bugs and ideas via [issues](https://github.com/qurle/notes/issues). Any dialogs are also welcome at [nick@qurle.net](mailto:nick@qurle.net?subject=notes.).
