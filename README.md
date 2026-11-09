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

## Version

The version in the sidenav footer and in `dist/version.json` (`{"version":"1.2.0"}`)
comes from the `APP_VERSION` environment variable when it is set, otherwise from
`package.json`. The release workflow passes the release tag (without the `v`) to
the Docker build, so the published image always shows the version of its release.
`/version.json` is what the PersonalHost Server page reads to show which version
is running.

## Install as an app (PWA)

The site is a Progressive Web App: browsers offer to install it (an
"Install app" button also appears in the sidenav footer), and once it has been
opened once it works offline.

- `src/pwa/manifest.webmanifest` and `src/pwa/icons/` are copied to `dist/` as-is.
- `src/pwa/sw.js` is the service worker. `build.js` generates `dist/sw.js` from
  it, filling in the list of pages and assets to keep offline and a cache name
  of the form `docs-<version>-<hash>`. Any change to the site changes the name,
  so installed copies update themselves; old caches are deleted.
- Pages are fetched network-first (a new release shows up immediately when you
  are online) and fall back to the cached copy when offline. `version.json` is
  never cached.
- Needs https (or `localhost` for local previews). `nginx.conf` sends
  `Cache-Control: no-cache` for `/sw.js` and `/manifest.webmanifest`; keep that
  if you put another proxy in front, otherwise an installed copy can't notice a
  new release.
- To change the icon, replace the files in `src/pwa/icons/` (192 and 512 px
  PNGs, a maskable 512 px PNG with the artwork inside the central 80 %, a
  180 px `apple-touch-icon.png` and the SVG).

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
    ├── pwa/              manifest, icons and the service worker template
    └── content/          one .html file per page
```
