# Mert Bildik — Portfolio

Personal portfolio site. Vite + React + TypeScript + Tailwind, deployed as a static site.

## Run it

```bash
npm install
cp .env.example .env    # then fill in VITE_FORMSPREE_ID, or the contact form will not send
npm run dev             # http://localhost:3000
```

Scripts are in `package.json`. `npm run typecheck`, `npm run build` and `npm run test` are the full check; there is no linter.

## Deploying

The app uses real URLs (`/portfolio/ofk`), so the host must serve `index.html` for any path it does not recognise. `public/_redirects` covers Netlify and Cloudflare Pages, `vercel.json` covers Vercel. On any other host, add the equivalent rule.

## Docs

| Where | What |
|---|---|
| [`docs/design/direction.md`](docs/design/direction.md) | The design system. Start here; it points at the other eight files. |
| [`docs/content/writing.md`](docs/content/writing.md) | Adding a case study or a project |
| [`CLAUDE.md`](CLAUDE.md) | The working rules, for agents and for anyone new |
| `src/index.css` | Every design value, in one `@theme` block |
