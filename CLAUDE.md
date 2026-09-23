# CLAUDE.md

Mert's portfolio. Next.js 16 App Router, React 19, Tailwind 4. Every page is pre-rendered.

## Commands

- `cp .env.example .env`, then set `NEXT_PUBLIC_FORMSPREE_ID`.
- `npm run dev` serves the site, plus the dev-only design system at `/design`.
- The full check, which CI also runs:
  `npm run format:check && npm run typecheck && npm run build && npm run test`
- Prettier formats; there is no linter, by choice.
- Playwright builds and serves the site on `:4173` itself. Don't run anything on that port.
  Tests run against the production build, so layout and missing-class bugs only show there.

## Before writing code

- This Next.js is newer than your training data. Read the matching guide in
  `node_modules/next/dist/docs/` before writing Next.js code.
- Every design value lives in the `@theme` block of `src/index.css`; there is no Tailwind
  config. Before visual work, read the Foundation list in `src/design/pages/Overview.tsx`
  and the page in `src/design/pages/` for the layer you are touching. Change values in
  `@theme`, never in a component.
- `src/design/` is dev-only. Never import it from the site.

## Each fact has one home

- Project facts and card copy: `src/portfolio/content/projects.ts`. A case study's body: its own
  component in `src/portfolio/case-studies/studies/`. Images: `src/portfolio/assets/<id>/`,
  `.webp` only.
- `projects.ts` and `src/app/meta.ts` are imported by the tests in plain Node, so they must
  not import assets.
- To add a project, add it to `projects.ts`; the typecheck and tests name whatever else is
  missing.
- Writing or editing copy on the site: follow `docs/content/writing.md`, and
  `docs/content/case-study-system.md` for case studies.
- Markdown docs describe what is true now. Git holds the history.

## These rules are Mert's

If a rule here blocks something reasonable, say so and ask rather than work around it.
