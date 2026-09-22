# CLAUDE.md

Personal portfolio. Vite + React 19 + TypeScript + Tailwind 4, static SPA. Deployed as static site; `vercel.json` and `public/_redirects` cover the SPA fallback.

## Commands

```bash
npm install
cp .env.example .env        # set VITE_FORMSPREE_ID — without it the form says so and points at the email
npm run dev                 # http://localhost:3000, host 0.0.0.0
npm run typecheck           # tsc --noEmit
npm run build               # vite build
npm run test                # Playwright; builds + serves on :4173, then tests
npm run format              # prettier --write .
npm run preview -- --port 4173 --strictPort   # if you want to poke the build manually
```

Prettier formats; there is **no ESLint**, and nothing here wants one. Config matches
what the code already did: 4-space and single quotes in TS/TSX, 2-space for CSS, HTML,
JSON and YAML. `docs/` is ignored until the design system replaces it.

## Stack quirks (real ones)

- **Tailwind 4** as a Vite plugin. No `tailwind.config.js`, no `postcss.config.js`. The whole theme lives in the `@theme` block of `src/index.css`. Token names map to utilities by prefix (`--color-*` → `bg-/text-/border-…`, `--text-*` → `text-*`, `--font-*` → `font-*`, `--ease-*` → `ease-*`, `--container-*` → `max-w-*`).
- **React Router v8** is the package `react-router` (not `react-router-dom`). Imports look like `from 'react-router'`.
- **motion** (the framer-motion successor) — import from `motion/react`, not `framer-motion`.
- `vite.config.ts` is included in `tsconfig.json` so it gets typechecked. Keep it valid TS.
- The Vite dev server uses a polling watcher (`usePolling: true`, 1s) — required for WSL. Don't "fix" it.
- Playwright's `webServer.reuseExistingServer: false` always rebuilds and starts fresh on `:4173`. Don't run a preview server there while testing.
- `vite.config.ts` holds an `seo` plugin that writes one HTML file per route plus `sitemap.xml`. It imports `src/app/meta.ts`, so that file and `content/projects.ts` must both stay free of asset imports — the config loads them in plain Node.

## Layout

```
src/
  app/                  # application shell, routes, and providers
  homepage/             # homepage composition, hero, page frame, and portrait
  contact/              # contact form and contact details
  portfolio/            # portfolio index, assets, and case studies
    content/projects.ts # the project index — metadata only, no prose
    assets/<id>/        # case-study images, .webp only
    assets/covers.ts    # id -> homepage card image
    case-studies/       # detail route, layout, shared parts
      studies/          # one hand-written page per project
  shared/               # genuinely cross-feature UI and motion only
  main.tsx, index.css   # root + the ONLY place design values are defined
public/                # static assets; _redirects handles SPA fallback on Netlify/CF
docs/
  design/              # superseded; see "The rules here are Mert's to set"
  content/             # writing.md (voice) and case-study-system.md (the frame)
```

## Tests

- `tests/smoke.spec.ts` is the only suite. Every page is loaded on production CSS, with viewport overflow and image-load checks. It also iterates `PROJECTS` from `src/portfolio/content/projects.ts`, so **every project you add is tested automatically**. That import runs in plain Node, so `projects.ts` must never import an asset — keep image bindings in `assets/covers.ts`.
- Tests run against the **production build** (`:4173`), not the dev server. Missing Tailwind classes and clipped layouts only show up here — `npm run build` is part of the loop, not optional.
- `.github/workflows/ci.yml` runs `format:check`, `typecheck`, `build` and `test` on every
  push and pull request. That is the gate; before, the same commands were listed here as
  "pre-merge" in a repo that commits straight to `main`, so nothing ran them.
- Run the same four locally before pushing if you want the answer sooner.

## Post-change consistency

- After changing a fact, rule, decision, name, route, or value, search the likely related files and check for contradictions. Keep the search targeted; do not scan the whole repository without a reason.
- Each fact has exactly one home. Project metadata lives in `content/projects.ts`; a case study's prose lives in its own component. Do not create a second copy of either, in docs or anywhere else.
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

## Adding content

A project is four things, and nothing else:

1. One entry in `src/portfolio/content/projects.ts` — metadata only. No prose.
2. One folder `src/portfolio/assets/<id>/` (lowercase-hyphenated, `.webp` only) containing `cover.webp`.
3. One line in `src/portfolio/assets/covers.ts` mapping the id to that cover.
4. One page in `src/portfolio/case-studies/studies/<Name>CaseStudy.tsx`, registered by id in `CaseStudyPage.tsx`.

Steps 3 and 4 are enforced: `COVERS` and `STUDIES` are keyed to `ProjectId`, which is
derived from the index, so a project without a cover or without a page fails
`npm run typecheck` and names itself. Step 2 is checked by the suite. Nothing about a
half-added project is silent any more.

Every case study is written by hand: the prose is yours, not a schema's. The frame around
it is shared. A standard project study renders `CaseStudyFrame` and fills the five
sections — Problem, Approach, Solution, Output, Impact — which it takes as a required
record, so one cannot be quietly dropped, and the section navigator is built from the same
list, so its anchors always match. Copy the nearest existing study and replace its words.

Inside a section: body copy is `CaseStudyParagraph`, a run of it is `CaseStudyProse`,
numbered sub-decisions are `CaseStudyDecision`, figures are `CaseStudyImage`. Paragraph
styling lives in `CaseStudyParagraph` alone — do not put type or measure classes on a `<p>`
in a study.

A study whose subject is an ongoing role rather than a shipped project runs its own
sections: see `McKinseyCaseStudy.tsx`, which keeps its own header because confidential work
reports a status rather than a timeline, and uses `CaseStudySectionShell` for the entrance.

`docs/content/case-study-system.md` and `docs/content/writing.md` describe the frame and the
voice. Read them for intent, not as rules — see the note below on what is current.

## Design rules

These are the ones held in the code today. They stand until the design system replaces
them, at which point they are open for review like anything else:

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

An unknown path renders a 404 page. An unknown _project_ id still redirects to `/#portfolio`,
deliberately: retired projects keep their URLs on old CVs and profiles.

## Page metadata

Titles, descriptions, canonicals and Open Graph tags are baked into a real HTML file per
route at build time by the `seo` plugin in `vite.config.ts`. They cannot come from React:
the site is a client-rendered SPA, and the crawlers that matter for a shared link — Slack,
LinkedIn, WhatsApp — read the HTML and never run the JavaScript.

The copy for each page lives in `src/app/meta.ts`. `PageMeta` sets the document title only,
so client-side navigation updates the browser tab; it must not render `meta` or `link`
tags, because React appends them to the baked-in ones rather than replacing them.

Each case study is written to both `portfolio/<id>.html` and `portfolio/<id>/index.html`:
hosts disagree about which one answers the extensionless URL.

## The rules here are Mert's to set

This file describes decisions, not laws of nature. Several rules that used to be here were
written by earlier sessions rather than chosen — a closed dependency list, a self-hosted
font constraint, a ban on formatters — and were removed once looked at. If a rule here
blocks something reasonable, say so and ask rather than working around it.

`docs/design/` and `docs/content/` are **not** current. They will be replaced by a
generated design system; several of their rules are already contradicted by the code. Do
not treat them as authority, and do not spend effort reconciling them.

`.claude/settings.local.json` switches six design and UX skills off — `ui-ux-pro-max`,
`ux-writing`, `grill-with-docs`, `verify-visually`, `vercel-react-best-practices`,
`web-design-guidelines` — so that generic guidance does not compete with this project's own
decisions. That is deliberate, and worth knowing about since it is otherwise invisible.

## Don't

- Don't add ESLint. Prettier is here; a linter is not, and that is a choice.
- Don't introduce `react-router-dom`. Use `react-router`.
- Don't put portfolio images in `public/`. They go in `src/portfolio/assets/`.
- Don't add a Tailwind config file. Edit `@theme` in `src/index.css`.
- Don't create a second copy of a fact. Metadata belongs in `content/projects.ts`, a case study's words belong in its own component.
