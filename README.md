# notes.

A simple [Astro](https://astro.build) page storage inspired by [type.baby](https://type.baby).

## Content

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

Like that? Check out [type.baby](https://type.baby) — a zen markdown editor, an insiration for notes.
