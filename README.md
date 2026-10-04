# CNA Camp website

New website for **Climber Nature Adventure Club (CNA Camp)**, Rajkot, rebuilt from the approved design at <https://cna-camp-final.vercel.app/>. It replaces the current cnacamp.com.

## Structure

| Path | What |
|---|---|
| `apps/frontend` | Next.js 16 site with **Payload CMS 3** built in (admin panel at `/admin`), MongoDB Atlas |
| `apps/backend` | NestJS scaffold, currently unused (kept for future payments/WhatsApp work if needed) |

## Run locally

Requirements: Node.js 20.9+ (tested on 22), access to the MongoDB Atlas cluster.

```bash
cd apps/frontend
npm install
cp .env.example .env   # then fill in the values (ask the project owner)
npm run dev            # http://localhost:3000, admin at http://localhost:3000/admin
```

Production build: `npm run build && npm start`.

The first visit to `/admin` creates the single admin account. After that, no further accounts can be created.

## Environment variables

- Real values live only in `apps/frontend/.env`, which git ignores. `.env.example` lists the key names.
- Do not create `.env.local`: Next.js gives it priority over `.env`, and even empty keys there blank out the real values.
- On networks where Node can't resolve `mongodb+srv://` addresses (`querySrv ECONNREFUSED`), set `MONGODB_HOSTS` and `MONGODB_REPLICA_SET` to use the standard connection format instead.

## Useful scripts (`apps/frontend`)

| Script | Does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint` | ESLint |
| `npm run generate:types` | Regenerate `src/payload-types.ts` after changing CMS collections |
| `npm run generate:importmap` | Regenerate the admin import map after adding admin components |
