# CLAUDE.md

Personal portfolio. Next.js 16 (App Router) + React 19 + TypeScript + Tailwind 4, deployed on
Vercel. Every page is pre-rendered to HTML at build time.

## Commands

```bash
npm install
cp .env.example .env    # NEXT_PUBLIC_FORMSPREE_ID — see .env.example
npm run dev             # prints the local URL; the design system is /design on it
npm run format          # prettier --write .
npm run format:check && npm run typecheck && npm run build && npm run test   # exactly what CI runs
```

Prettier formats; there is **no ESLint**, and nothing here wants one. Config matches
what the code already did: 4-space and single quotes in TS/TSX, 2-space for CSS, HTML,
JSON and YAML. `docs/` is ignored, so the two content documents keep the line breaks
they were written with.

## Stack quirks (real ones)

- **Next.js docs** matching the installed version ship in `node_modules/next/dist/docs/`.
  This Next.js has APIs and conventions newer than most training data: read the relevant
  guide there before writing Next.js code. `agentRules: false` in `next.config.ts` stops
  `next dev` from writing an `AGENTS.md` and editing this file to point at it; this file is
  the one place for agent instructions.
- **Tailwind 4** through `@tailwindcss/postcss`, which is what `postcss.config.mjs` is for.
  No `tailwind.config.js`. The whole theme lives in the `@theme` block of `src/index.css`.
  Token names map to utilities by prefix (`--color-*` → `bg-/text-/border-…`, `--text-*` →
  `text-*`, `--font-*` → `font-*`, `--ease-*` → `ease-*`, `--container-*` → `max-w-*`).
- **Server components by default.** Only the contact form, the case-study section navigator
  and the design system run in the browser, marked `'use client'`. Keep it that way unless
  a component needs state, effects or event handlers.
- **Links** are `next/link`; **images** are `next/image` with a static import, which is
  what gives each image its size in the HTML. The fonts are self-hosted through
  `next/font/local` in `src/app/layout.tsx`, and `@theme` reads them as `--font-inter` and
  `--font-geist-mono`.
- **motion** (the framer-motion successor) — import from `motion/react`, not `framer-motion`.
- `npm run typecheck` runs `next typegen` before `tsc`, because the image and route types
  are generated; `next-env.d.ts` is generated too and not committed.
- Playwright's `webServer.reuseExistingServer: false` always rebuilds and starts fresh on `:4173`. Don't run a server there while testing.
- `src/app/meta.ts` and `content/projects.ts` must stay free of asset imports: the test
  suite imports both in plain Node.

## Layout

```
src/
  app/                  # routes (Next.js App Router), root layout, metadata, fonts
  homepage/             # homepage composition, hero, page frame, and portrait
  contact/              # contact form and contact details
  portfolio/            # portfolio index, assets, and case studies
    content/projects.ts # the project index — metadata only, no prose
    assets/<id>/        # case-study images, .webp only
    assets/covers.ts    # id -> homepage card image
    case-studies/       # detail route, layout, shared parts
      studies/          # one hand-written page per project
  shared/               # genuinely cross-feature UI and motion only
  design/               # the living design system at /design — DEV ONLY, never ships
    theme.ts            # parses the @theme block of index.css
    live.ts             # reads painted values and contrast from the browser
    census.ts           # counts real class usage across src/**/*.tsx
    pages/              # Overview, Type, Colour, Space, Surfaces, Motion, Components
  index.css             # the ONLY place design values are defined
docs/
  content/             # writing.md (voice) and case-study-system.md (the frame)
```

## Tests

- `tests/smoke.spec.ts` is the only suite. Every page is loaded on production CSS, with viewport overflow and image-load checks. It also iterates `PROJECTS` from `src/portfolio/content/projects.ts`, so **every project you add is tested automatically**. That import runs in plain Node, so `projects.ts` must never import an asset — keep image bindings in `assets/covers.ts`.
- The suite protects behaviour, structure and invariants, not copy. A fact it checks is
  imported from the module that owns it (`PROJECTS`, `PAGES` and `SITE_URL`, the contact
  details, the `@theme` breakpoints), never retyped, and it does not assert sentences.
- Tests run against the **production build** (`:4173`), not the dev server. Missing Tailwind classes and clipped layouts only show up here — `npm run build` is part of the loop, not optional.
- `.github/workflows/ci.yml` runs `format:check`, `typecheck`, `build` and `test` on every
  pull request and on every push to `main`.
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
reports a status rather than a timeline, and uses `CaseStudySectionShell` for its sections.

`docs/content/case-study-system.md` and `docs/content/writing.md` describe the frame and the
voice.

## The design system

It is a set of pages, not a document: `src/design/`, served at `/design` by `npm run dev`.
Open it before changing anything visual, and read the page for the layer you are touching —
Type, Colour, Space, Surfaces, Motion, or Components.

The constraints it holds, in short:

- Two typefaces. Inter for words, Geist Mono for data. No third face.
- Eight type roles on five sizes, two weights (500 names, 400 is read). Size marks the page
  and the section; below that, hierarchy comes from weight and ink. Inter never runs below
  13; Geist Mono sets data at 12.
- Achromatic. Contrast follows how text is read, not its rank: `ink` for anything read at
  12–15px, `ink-large` for 20px and up, `ink-secondary` for annotation, `ink-faint` for
  placeholders. Nothing is brighter than `ink`. Green and red are status marks only.
- A 4px grid: every distance, and every line height but display's (34px, an optical
  choice), is a multiple of 4. Dividers use `rule-t`, `rule-b` or `rule-y`, which take no
  space; a `border` is only for an object's edge.
- No elevation. Depth is edge and fill.
- One minimal radius (6px) on boxes; full circle on pills, dots, buttons and the portrait.
- Motion for feedback and causality only. Nothing animates on arrival.
- No arbitrary value where a token or a 4px step already covers it.

Change a value in the `@theme` block of `src/index.css`, never in a component. The design
system reads that block, the browser and `src/**/*.tsx` directly — every number, ratio and
usage count on those pages is derived, so nothing there needs updating when a token changes,
and a page that looks wrong means the code is wrong.

`/design` is local only, behind two gates. Its one route file is
`src/app/design/[[...page]]/page.dev.tsx`, and `next.config.ts` counts `.dev.tsx` as a page
only under `next dev`, so a build has no `/design` route and bundles nothing from
`src/design/`. And `src/index.css` leaves `src/design/` out of the site's stylesheet;
`src/design/design.css`, loaded only by that route, generates the classes it needs. Keep both
gates if you touch either file. The route reads `src/index.css` and the site's components from
disk on the server and hands them to the catalogue, which renders in the browser only
because it measures the live document.

## Routes and hosting

Routes are files under `src/app/`: the homepage, `portfolio/[id]` (one pre-built page per
project in the index), `not-found.tsx`, `sitemap.ts` and `robots.ts`. Old URLs are real
HTTP redirects in `next.config.ts`: `/case-study/:id` permanently to `/portfolio/:id`, and
`/portfolio` and `/contact` temporarily to their homepage sections.

An unknown path renders the 404 page with a 404 status. An unknown _project_ id redirects to
`/#portfolio`, deliberately: retired projects keep their URLs on old CVs and profiles.

Vercel detects Next.js on its own, so there is no `vercel.json`. On another host, use that
host's Next.js adapter; the site is not a folder of static files.

## Page metadata

Titles, descriptions, canonicals and Open Graph tags are in the HTML each page is served
with — the only thing the crawlers that matter for a shared link (Slack, LinkedIn, WhatsApp)
read. The copy for each page lives in `src/app/meta.ts`; `toMetadata` turns it into the
Next.js metadata the routes export, and the root layout's `metadataBase` makes URLs absolute.
The sitemap is built from the same `PAGES` list. Confidential work gets no preview image.

## The rules here are Mert's to set

This file describes decisions, not laws of nature. Several rules that used to be here were
written by earlier sessions rather than chosen — a closed dependency list, a self-hosted
font constraint, a ban on formatters — and were removed once looked at. If a rule here
blocks something reasonable, say so and ask rather than working around it.

`docs/design/` was nine markdown files describing the design system. It is gone: `/design`
holds the same material, derives its values instead of restating them, and shows the real
components. `docs/content/` stayed, because voice is prose and has nothing to read back from
the code.

`.claude/settings.local.json` switches six design and UX skills off — `ui-ux-pro-max`,
`ux-writing`, `grill-with-docs`, `verify-visually`, `vercel-react-best-practices`,
`web-design-guidelines` — so that generic guidance does not compete with this project's own
decisions. That is deliberate, and worth knowing about since it is otherwise invisible.

## Don't

- Don't add ESLint. Prettier is here; a linter is not, and that is a choice.
- Don't add a router or a second way to navigate. Routes are files in `src/app/`; links are `next/link`.
- Don't put portfolio images in `public/`. They go in `src/portfolio/assets/`.
- Don't add a Tailwind config file. Edit `@theme` in `src/index.css`.
- Don't create a second copy of a fact. Metadata belongs in `content/projects.ts`, a case study's words belong in its own component.
