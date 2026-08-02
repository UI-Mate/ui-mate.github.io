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
| `assets/favicon.*`, `assets/apple-touch-icon.png` | Tab and home-screen icons, built from the desktop app's own icon |
| `assets/demos/` | Demo videos and posters — see the README in that folder |

Sections, in order: title and team, overview, capabilities, method, results, demos,
citation.

## Icons

The tab and home-screen icons are the desktop app's own cursor mark, not the
Hunyuan logo: the blue cursor with its navy facet and the 16%-opacity navy ghost
behind it. Colours and path data are copied from
`GUI-Agent-App/scripts/render_app_icon.py`, which authors the artwork on a
170×170 tile.

`scripts/build_icons.py` is the source of truth. Run it to rebuild every icon:

```bash
python3 scripts/build_icons.py    # needs cairosvg and pillow
```

Both `assets/favicon.svg` and the PNGs are generated, so edits to them are lost on
the next run — change the script instead. Sizes are 16, 32 and 192, plus a 180
`apple-touch-icon.png`; that last one is a full-bleed white square with no corner
radius of its own, because iOS applies its own mask.

The one departure from the app icon is placement. That script insets the mark, as
macOS icons are meant to sit inside their tile, which leaves it small for a favicon.
Here it is scaled to `FILL` (0.84) of the tile and centred — worth knowing that the
ghost is rotated, so it reaches above and left of the drawing origin, and centring
has to work from the rendered ink bounds of ghost and cursor **together**. Centring
on the cursor, or on the path coordinates, visibly misplaces the mark.

The ghost costs legibility at the smallest size: at 16px it adds grey mass that
blurs the cursor's outline. It survives at 32px, which is what retina screens use
for a tab, and modern browsers take the SVG anyway. If the 16px fallback matters,
the fix is to build that one size with the ghost stripped.

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

**Remove the `noindex` tag first.** `index.html` carries
`<meta name="robots" content="noindex, nofollow">` so the page stays out of search
results while the report is unannounced. The site is live and anyone with the URL can
read it — that tag only keeps it from being indexed. Leave it in at launch and the page
stays invisible to search.

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

Any static host works; this one goes to GitHub Pages at <https://ui-mate.github.io>.

That hostname is not a domain anyone registered — GitHub derives it from the account
name. It requires an account (user or organisation) named `ui-mate` owning a repository
named `ui-mate.github.io`; renaming either changes the URL. Here the owner is a free
organisation, so the page is not tied to one person's account.

Pages serves the root of `main`, so a push is the whole deploy — there is nothing to
build, and the first build after a push takes about a minute. The repository has to stay
public: on free plans Pages only serves public repositories.

`.nojekyll` disables Jekyll. Nothing here needs it, and left on it would silently drop
any path beginning with an underscore.

To move to a registered domain later, add a `CNAME` file holding the hostname and point
a DNS `CNAME` record at `ui-mate.github.io`. Keep every asset reference relative, as
they are now, and the page will also work unchanged under a subpath such as
`https://<org>.github.io/UI-Mate/`.
