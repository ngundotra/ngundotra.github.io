# Noah Gundotra — Toy Museum

A personal site: things I built that I still think are cool. Four projects, no build step.

Open `index.html` in a browser, or wait for GitHub Pages to serve the repository root.

## How Pages is served

This is a user Pages repo (`ngundotra.github.io`). GitHub Pages is set to the `master` branch, site root (`/`). After this tree is on `master`, [ngundotra.github.io](https://ngundotra.github.io) serves `index.html` directly.

There is no Next.js (or other) build. The old Create Next App stub never wrote a root `index.html`, which is why the domain 404’d.

If you ever switch Pages to **GitHub Actions**, `.github/workflows/pages.yml` uploads this same static root.

## Layout

- `index.html`, `styles.css`, `script.js`, `favicon.svg` — the museum
- `assets/` — exhibit photographs downloaded from the original writeups and Devpost
- `pages/`, `styles/`, `archive/` — leftover Next.js / Hugo files, not the live site
