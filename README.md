# Mert Bildik — Portfolio

Personal portfolio site. Vite + React + TypeScript + Tailwind, deployed as a static site.

## Run it

```bash
npm install
cp .env.example .env    # then fill in VITE_FORMSPREE_ID, or the contact form cannot send
npm run dev             # prints the local URL
```

Scripts are in `package.json`. `npm run format:check`, `npm run typecheck`, `npm run build`
and `npm run test` are the full check, and CI runs all four on every push. Prettier
formats; there is no ESLint.

## Deploying

The app uses real URLs (`/portfolio/ofk`), so the host must serve `index.html` for any path it does not recognise. `public/_redirects` covers Netlify and Cloudflare Pages, `vercel.json` covers Vercel. On any other host, add the equivalent rule.

## Docs

| Where                                                                    | What                                                                 |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| `/design`                                                                | The design system, live. Run `npm run dev` and open it — local only. |
| [`docs/content/case-study-system.md`](docs/content/case-study-system.md) | The frame every case study follows                                   |
| [`docs/content/writing.md`](docs/content/writing.md)                     | How to write inside that frame                                       |
| [`CLAUDE.md`](CLAUDE.md)                                                 | The working rules, including how to add a project                    |
| `src/index.css`                                                          | Every design value, in one `@theme` block                            |

The design system is a set of pages under `src/design/`, not a document. It reads the
`@theme` block, the browser and the site's own source, so it cannot fall out of date. It
is gated behind `import.meta.env.DEV` and never reaches a build.
