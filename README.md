# Mert Bildik — Portfolio

Personal portfolio site. Next.js (App Router) + React + TypeScript + Tailwind, deployed on Vercel.

## Run it

```bash
npm install
cp .env.example .env    # then fill in NEXT_PUBLIC_FORMSPREE_ID, or the contact form cannot send
npm run dev             # prints the local URL
```

Scripts are in `package.json`. `npm run format:check`, `npm run typecheck`, `npm run build`
and `npm run test` are the full check, and CI runs all four on every pull request and
every push to `main`. Prettier formats; there is no ESLint.

## Deploying

Vercel detects Next.js and needs no configuration. Set `NEXT_PUBLIC_FORMSPREE_ID` in the
project's environment variables. Every page is pre-rendered at build time; old URLs are
redirected in `next.config.ts`. On another host, use its Next.js adapter.

## Docs

| Where                                                                    | What                                                                 |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| `/design`                                                                | The design system, live. Run `npm run dev` and open it — local only. |
| [`docs/content/case-study-system.md`](docs/content/case-study-system.md) | The frame every case study follows                                   |
| [`docs/content/writing.md`](docs/content/writing.md)                     | How to write inside that frame                                       |
| [`CLAUDE.md`](CLAUDE.md)                                                 | The working rules for Claude Code                                    |
| `src/index.css`                                                          | Every design value, in one `@theme` block                            |

The design system is a set of pages under `src/design/`, not a document. It reads the
`@theme` block, the browser and the site's own source, so it cannot fall out of date. It
exists only under `npm run dev` and never reaches a build.
