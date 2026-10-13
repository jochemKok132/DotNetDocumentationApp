# docsite

A small, dependency-free static documentation site: sidenav with dropdown
sections, dark theme, and code blocks with syntax highlighting + copy
buttons. Builds to plain static files for nginx.

## Build

```bash
npm run build
```

Output goes to `dist/` — that's the only folder your server needs.

## Preview locally

```bash
cd dist && python3 -m http.server 8080
```

## Add a page

1. Create `src/content/your-page.html` with just the page body (an `<h1>`,
   paragraphs, code blocks, etc — no `<html>`/`<head>`/sidenav needed).
2. Add an entry for it in `nav.config.js`, inside an existing section or a
   new one.
3. Rebuild.

Full walkthrough is in the site itself once built: **Guides → Writing a
Page**.

## Deploy

Copy `dist/` to your server and point nginx at it — see
`nginx.conf.example` for a minimal server block.

## Structure

```
docsite/
├── nav.config.js       sidebar structure (sections, dropdowns, pages)
├── build.js             build script
├── package.json
├── nginx.conf.example
└── src/
    ├── template.html     page shell (head, sidenav slot, content slot)
    ├── styles/main.css
    ├── scripts/main.js
    └── content/          one .html file per page
```
