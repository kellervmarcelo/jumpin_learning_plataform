This is [JumpIn](https://github.com/), an AI-powered learning platform. See [AGENTS.md](./AGENTS.md) for the full product and architecture spec.

## Project structure

Two standalone workspaces in one repo (no npm/pnpm workspace linking — each has its own `package.json` and `node_modules`):

- `studio/` — Sanity Studio (content schema and authoring). Runs on Vite, independent of the Next.js app.
- `web/` — the Next.js app (App Router): pages, search UI, Clerk auth, and all server-side integration.

## Getting started

Copy each workspace's `.env.example` to `.env.local` and fill in the values, then run both dev servers side by side, in separate terminals:

```bash
cd studio && npm install && npm run dev   # http://localhost:3333
```

```bash
cd web && npm install && npm run dev      # http://localhost:3000
```

After changing the schema or a GROQ query, regenerate `web/sanity.types.ts`:

```bash
cd studio && npm run typegen
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
