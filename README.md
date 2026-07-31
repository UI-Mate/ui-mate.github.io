# UI-Mate project page

Project homepage for **UI-Mate Technical Report: Advancing Foundation GUI Agents with
In-Context Demonstrations** — Tencent HY Frontier, Multimodal Agent Team.

A dependency-free static page: three files, no build step, no framework. Bilingual
(English / 中文) with the language switch in the header.

## Running it

Open `index.html` directly, or serve the folder so that relative paths and the clipboard
API behave exactly as they will in production:

```bash
python3 -m http.server 4173
# → http://127.0.0.1:4173/
```

The page remembers the chosen language in `localStorage`, and `?lang=zh` / `?lang=en`
forces one for sharing a specific version.

## Layout

| File | Contents |
|---|---|
| `index.html` | Structure only — every string is a `data-i18n` key |
| `styles.css` | Design system: Tencent Hunyuan blues, cards, responsive rules |
| `i18n.js` | **All copy, both languages**, plus the chart and demo data |
| `main.js` | Language switching, scrollspy, chart rendering, demo reel, copy button |
| `assets/hy_logo.png` | Tencent Hunyuan mark, used in the nav, hero badge, and footer |
| `assets/demos/` | Demo videos and posters — see the README in that folder |

Sections, in order: title and team, overview, capabilities, method, results, demos,
citation.

## Editing copy

Both languages live side by side in `i18n.js`, keyed identically:

```js
"cap.1.h": "Native desktop control",   // in the `en` block
"cap.1.h": "原生桌面操控",              // in the `zh` block
```

Values may contain inline HTML (`<strong>`, `<em>`, `<code>`, entities); `main.js` detects
that and assigns `innerHTML` instead of `textContent`. To add a string, put a
`data-i18n="your.key"` attribute on the element and add the key to **both** blocks — a key
missing from `zh` silently falls back to English rather than rendering blank.

## Before publishing

1. **Link targets.** Five hero buttons point at `#` and carry a `data-todo` attribute; they
   render with a dashed border and a dot so nothing looks broken while unresolved. Replace
   the `href` values and delete `class="... is-pending"` plus `data-todo` on each. Then
   remove the `hero.fineprint` line from `index.html` and `i18n.js`.
2. **Authors.** The page credits the team rather than individuals, with a note pointing at
   the report. Add the author list to the hero and to the BibTeX entry in `index.html`.
3. **BibTeX.** Fill in the arXiv identifier and the real citation key.
4. **Demo clips.** See `assets/demos/README.md`. Each entry stays a placeholder until you
   set `ready: true` in `i18n.js`.
5. **Results.** The numbers in the table and in `window.UIMATE_CHART` come from internal
   DemoCUA runs. Reconcile them with the final report before publishing, and replace
   "General VLM baseline" with the actual model name and version you want to disclose.
6. **Social preview.** `index.html` has Open Graph title and description but no
   `og:image`; add a 1200×630 card if the page will be shared.

## Deploying

Any static host works. For GitHub Pages, push to a repository and point Pages at the
default branch root — there is nothing to build.
