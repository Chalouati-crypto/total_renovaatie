# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project summary
- Next.js (App Router) site with a localized “frontend” and an embedded Payload CMS admin/API.
- Content is primarily served from Payload (Postgres) and rendered by server components in `src/app/(frontend)/...`.
- The root `src/app/layout.tsx` intentionally returns `children` only; the “real” HTML shell lives in the route-group layouts:
  - Frontend: `src/app/(frontend)/[locale]/layout.tsx`
  - Payload admin/API: `src/app/(payload)/layout.tsx`
- Localization is handled in two places:
  - Frontend routing/messages via `next-intl` (`src/i18n/*`, `messages/*.json`, `src/middleware.ts`).
  - Payload’s own localization for collections/globals (`src/payload.config.ts`).

## Common commands (npm)
Install:
- `npm install`
- `npm ci` (clean install from `package-lock.json`)

Run dev server:
- `npm run dev`

Build / run production:
- `npm run build`
- `npm run start`
- `npm run preview` (build + start)

Lint / typecheck:
- `npm run lint`
- `npm run lint:fix`
- `npm run typecheck`
- `npm run check` (lint + typecheck; use this in CI-like checks since `next.config.js` ignores lint/type errors during `next build`)

Formatting:
- `npm run format:check`
- `npm run format:write`

Tests:
- No test runner is currently configured (there is no `test` script in `package.json`).

## Database + migrations (Postgres + Drizzle)
Local dev database:
- `start-database.sh` starts a local Postgres container based on `DATABASE_URL` in `.env`.
  - On Windows, the script is meant to be run from WSL (see comments at top of `start-database.sh`).

Drizzle schema/config:
- Schema: `src/server/db/schema.ts`
- Drizzle connection: `src/server/db/index.ts`
- Drizzle kit config: `drizzle.config.ts`

Drizzle kit commands:
- `npm run db:generate`
- `npm run db:migrate`
- `npm run db:push`
- `npm run db:studio`

Seeding:
- `npm run db:seed` (runs `src/server/db/seed.ts` via `tsx --env-file=.env`)
- There is also a Payload-based seed script at `src/server/db/payload-seed.ts` (not wired as an npm script).

## Payload CMS integration
Key files:
- Payload config: `src/payload.config.ts`
- Payload admin/app integration (Next): `src/app/(payload)/layout.tsx`
- Payload REST API route (generated): `src/app/(payload)/api/[...slug]/route.ts`
- Payload admin catch-all route: `src/app/(payload)/admin/[[...segments]]/page.tsx`
- Payload import map (generated): `src/app/(payload)/admin/importMap.js`

When editing Payload schema:
- Collections live in `src/collections/*` and globals in `src/globals/*`.
- `src/payload.config.ts` enables:
  - Postgres adapter (`@payloadcms/db-postgres`) using `DATABASE_URL`
  - Vercel Blob storage plugin for uploads (`@payloadcms/storage-vercel-blob`)
  - Payload localization (en/fr/nl)
- Types are configured to output to `src/payload-types.ts`.

Import map generation:
- `npm run generate:importmap` updates the generated `src/app/(payload)/admin/importMap.js`.
  - This matters when adding/changing custom admin components (e.g. `src/components/payload/IconSelect.tsx`).

## Frontend routing + i18n (next-intl)
Routing structure:
- Frontend route group: `src/app/(frontend)/[locale]/...`
  - `layout.tsx` wraps the site in `NextIntlClientProvider` and loads messages.
  - `page.tsx` is the main landing page and fetches content (Payload) server-side.

next-intl configuration:
- Routing + navigation helpers: `src/i18n/routing.ts`
- Request config + message loading: `src/i18n/request.ts`
- Locale middleware: `src/middleware.ts`
  - Explicitly bypasses `/admin` and `/api` so Payload routes are not locale-prefixed.

Message catalogs:
- `messages/en.json`, `messages/fr.json`, `messages/nl.json`

## Data flow “big picture”
- The homepage server component (`src/app/(frontend)/[locale]/page.tsx`) uses:
  - Payload SDK via `getPayload({ config: @payload-config })`
  - Helpers in `src/lib/data.ts` (Payload reads for categories/services/work images)
  - Global content via `payload.findGlobal({ slug: "site-settings", locale, ... })`
- UI sections are implemented as React components in `src/components/*.tsx`.

## Environment variables
Environment variables are validated in `src/env.js` (imported by `next.config.js`).
- If needed, run dev/build with `SKIP_ENV_VALIDATION=1` to bypass validation.
- `.env.example` is the template for `.env` (keep it in sync with `src/env.js`).
