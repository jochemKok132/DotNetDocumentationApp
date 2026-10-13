#!/usr/bin/env node
// Zero-dependency static site build.
// Reads nav.config.js + src/content/*.html, wraps each page in src/template.html,
// and writes plain .html files (plus assets) into dist/ — ready to point nginx at.

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const nav = require('./nav.config.js');

// Version comes from package.json, and package.json's version is the thing a
// GitHub Release bumps. The release workflow (see .github/workflows/release-deploy.yml
// and the "Versioned Releases & Auto-Deploy" page) tags a commit, publishes a
// GitHub Release from it, and only then does this build run — so the number
// stamped into the footer always matches a real, published release.
const VERSION = require('./package.json').version;

function clean(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(src, dest);
    else fs.copyFileSync(src, dest);
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Build the sidebar markup once. Every page reuses it; only the "active"
// link and which <details> starts open change per page.
function renderSidebar(activeSlug) {
  return nav
    .map((section) => {
      const containsActive = section.items.some((i) => i.slug === activeSlug);
      const items = section.items
        .map((item) => {
          const cls = item.slug === activeSlug ? ' class="active"' : '';
          const current = item.slug === activeSlug ? ' aria-current="page"' : '';
          return `          <li><a href="${item.slug}.html"${cls}${current}>${escapeHtml(item.title)}</a></li>`;
        })
        .join('\n');
      return `      <details class="nav-section"${containsActive ? ' open' : ''}>
        <summary>${escapeHtml(section.title)}</summary>
        <ul>
${items}
        </ul>
      </details>`;
    })
    .join('\n');
}

function build() {
  clean(DIST);

  const template = fs.readFileSync(path.join(SRC, 'template.html'), 'utf8');

  // assets
  copyDir(path.join(SRC, 'styles'), path.join(DIST, 'assets'));
  copyDir(path.join(SRC, 'scripts'), path.join(DIST, 'assets'));

  let pageCount = 0;
  for (const section of nav) {
    for (const item of section.items) {
      const contentPath = path.join(SRC, 'content', item.file);
      if (!fs.existsSync(contentPath)) {
        console.warn(`[build] WARNING: missing content file for "${item.title}": ${contentPath}`);
        continue;
      }
      const content = fs.readFileSync(contentPath, 'utf8');
      const sidebar = renderSidebar(item.slug);

      const html = template
        .replace('{{TITLE}}', escapeHtml(item.title))
        .replace('{{SIDEBAR}}', sidebar)
        .replace('{{VERSION}}', escapeHtml(VERSION))
        .replace('{{CONTENT}}', content);

      fs.writeFileSync(path.join(DIST, `${item.slug}.html`), html);
      pageCount += 1;
    }
  }

  console.log(`[build] wrote ${pageCount} page(s) to ${path.relative(ROOT, DIST)}/`);
}

build();
