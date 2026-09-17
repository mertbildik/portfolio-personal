# CLAUDE.md

Personal portfolio. Vite + React 19 + TypeScript + Tailwind 4, static SPA. Deployed as static site; `vercel.json` and `public/_redirects` cover the SPA fallback.

## Commands

```bash
npm install
cp .env.example .env        # set VITE_FORMSPREE_ID — contact form is silent without it
npm run dev                 # http://localhost:3000, host 0.0.0.0
npm run typecheck           # tsc --noEmit
npm run build               # vite build
npm run test                # Playwright; builds + serves on :4173, then tests
npm run preview -- --port 4173 --strictPort   # if you want to poke the build manually
```

There is **no linter**. Do not invent eslint/prettier configs.

## Stack quirks (real ones)

- **Tailwind 4** as a Vite plugin. No `tailwind.config.js`, no `postcss.config.js`. The whole theme lives in the `@theme` block of `src/index.css`. Token names map to utilities by prefix (`--color-*` → `bg-/text-/border-…`, `--text-*` → `text-*`, `--font-*` → `font-*`, `--ease-*` → `ease-*`, `--container-*` → `max-w-*`).
- **React Router v8** is the package `react-router` (not `react-router-dom`). Imports look like `from 'react-router'`.
- **motion** (the framer-motion successor) — import from `motion/react`, not `framer-motion`.
- `vite.config.ts` is included in `tsconfig.json` so it gets typechecked. Keep it valid TS.
- The Vite dev server uses a polling watcher (`usePolling: true`, 1s) — required for WSL. Don't "fix" it.
- Playwright's `webServer.reuseExistingServer: false` always rebuilds and starts fresh on `:4173`. Don't run a preview server there while testing.

## Layout

```
src/
  app/                  # application shell, routes, and providers
  homepage/             # homepage composition, hero, page frame, and portrait
  contact/              # contact form and contact details
  portfolio/            # portfolio index, runtime content, assets, and case studies
    content/            # projects.ts and employment.ts — runtime content source
    assets/<id>/        # case-study images, .webp only
    case-studies/       # detail route, layout, templates, and custom studies
  shared/               # genuinely cross-feature UI and motion only
  main.tsx, index.css   # root + the ONLY place design values are defined
public/                # static assets; _redirects handles SPA fallback on Netlify/CF
docs/
  design/              # design system — read direction.md first
  content/writing.md   # how to add a project or case study
  engineering/         # architecture and engineering references
```

## Tests

- `tests/smoke.spec.ts` is the only suite. Every page is loaded on production CSS, with viewport overflow and image-load checks. It also iterates `PROJECTS` from `src/portfolio/content/projects.ts`, so **every project you add is tested automatically**.
- Tests run against the **production build** (`:4173`), not the dev server. Missing Tailwind classes and clipped layouts only show up here — `npm run build` is part of the loop, not optional.
- Pre-merge: `npm run typecheck && npm run build && npm run test`.

## Post-change consistency

- After changing a fact, rule, decision, name, route, or value, search the likely related files and check for contradictions. Keep the search targeted; do not scan the whole repository without a reason.
- `docs/content/` is the human-readable editorial reference; `src/portfolio/content/` and hand-written case-study components are the runtime representation. Content changes must keep both representations consistent.
- If a meaningful conflict appears, show it, recommend the smallest correct resolution, and wait for approval. Do not resolve it silently.
- Test only the affected scope unless broader verification is explicitly requested.

## Markdown documentation

Treat regular `.md` files as clean, finalized documentation, not logs.

Do not keep:

- process notes
- pending approvals
- unresolved ideas
- decision history
- temporary reasoning
- descriptions of what used to be different

Git history owns change history.

## Unresolved decisions

- Keep unresolved decisions in the root `decisions.md`.
- Anything not fully decided belongs there instead of regular documentation.
- Once resolved, apply the final result to the appropriate canonical file and remove the entry from `decisions.md`.
- Do not keep the same decision in both places.
- Before resolving a decision through agent judgment rather than explicit user instruction, show the proposed resolution in chat and wait for approval.

## Adding content

A project = one entry in `src/portfolio/content/projects.ts` + images under `src/portfolio/assets/<id>/` (filenames matching `id`, lowercase-hyphenated, `.webp` only, prefix with `1-`, `2-` for order). Each entry explicitly selects `template`, `employment`, or `custom` rendering and whether it is listed. `ProjectCaseStudy` parses plain strings — `\n` for paragraphs, `•`/`-` lines for bullets, em dash splits `keyDecisions` into title/body. Full rules in `docs/content/writing.md`.

## Design rules (load-bearing)

Read `docs/design/direction.md` first. The non-negotiables:

- One typeface for words (Inter) + Geist Mono for data. No third face.
- No shadows. Depth is border + fill.
- No new colours. Green and red are status only. Everything else is white at an alpha.
- Ink ramp carries hierarchy; size does not. A heading uses one size.
- Sans for sentences and labels; monospace for data (timestamps, coordinates, counts, values).
- One minimal radius (6px) on boxes; full circle on pills, dots, buttons and the portrait.
- No arbitrary values where a token or scale step already covers it.

Change a value in `src/index.css` `@theme` block, never in a component.

## Routers / hosts

The app uses real paths (`/portfolio/ofk`). The host must serve `index.html` for any unknown path — `public/_redirects` (Netlify, Cloudflare Pages) and `vercel.json` (Vercel) cover it. Any other host needs the same rewrite.

## Don't

- Don't add lint/format tooling — it's deliberately absent.
- Don't introduce `react-router-dom`. Use `react-router`.
- Don't put portfolio images in `public/`. They go in `src/portfolio/assets/`.
- Don't add a Tailwind config file. Edit `@theme` in `src/index.css`.
- Don't write a case study that's a copy of a doc page — the smoke test asserts every `output` block reaches the page.
