# Avlu: short-term rental management website

Corporate website for a property management company in Türkiye, aimed at property owners. Next.js (App Router), TypeScript, Tailwind CSS v4 and Lucide. It has no booking engine and no payments. The **Evlerim** page (`/evlerim`) lists homes live from the PMS.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
npm run typecheck
```

Copy `.env.example` to `.env.local` to set the variables below.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL, used for canonical links, Open Graph, the sitemap and robots.txt. **Read at build time**, so it must be set when running `next build`. Without it, those URLs point to localhost. |
| `PMS_API_URL` | Base URL of the Django PMS REST API, including `/api` (local Docker: `http://localhost/api`). |
| `PMS_MEDIA_URL` | Optional. Where the PMS serves uploaded photos. Defaults to `<origin of PMS_API_URL>/media`. |
| `PMS_API_TOKEN` | Optional. Sent as `Authorization: Token <value>`. |

## Structure

```
app/                 Routes, metadata, sitemap and robots
components/layout/   Header, footer, logo
components/sections/ Page sections
components/forms/    Forms, fields, shared form hook
components/ui/       Button, photo, container, headings
lib/site-config.ts   Brand name, contact details, navigation
lib/data/            Plans, services, FAQ, blog posts, legal drafts
lib/api/             PMS client and lead delivery (the integration seam)
lib/actions/         Form Server Actions
lib/validation/      Validation shared by browser and server
lib/types/           Lead types
```

Design tokens (colours, fonts, type scale) are in `app/globals.css`.

## Evlerim: homes from the PMS

`/evlerim`, `/evlerim/[id]` and the homepage's featured homes read from the PMS endpoint `GET <PMS_API_URL>/public/properties/`. It is public and read-only, returns only active homes and leaves out phone, e-mail and street address. The data is the same Docker Postgres database the PMS panel writes to, so a home added in the PMS appears on the site within about 30 seconds (`REVALIDATE_SECONDS` in `lib/api/properties.ts`). Making a home inactive in the PMS removes it.

Photos are served through `app/pms-media/[...path]/route.ts`, so browsers never need to reach the PMS host directly. If the PMS cannot be reached, the pages show an error state instead of failing.

## Connecting the PMS

Forms post to Server Actions, which validate and then call `lib/api/leads.ts`. Set `PMS_API_URL` and the forms start delivering to these proposed endpoints, to be agreed with the API:

- `POST /leads/owner-applications/`
- `POST /leads/contact-messages/`

With `PMS_API_URL` unset, development logs each submission to the server console. **Production shows the error state**, with phone, email and WhatsApp alternatives, rather than confirming a lead nobody will receive.

## Before launch

- [ ] Brand name, logo and contact details in `lib/site-config.ts`, `components/layout/logo.tsx` and `app/icon.svg`. Everything there is a placeholder.
- [ ] The "Neden Avlu" heading and the name story on `/about` use the placeholder brand name.
- [ ] Earnings calculator coefficients in `lib/data/earnings.ts` (city base rates, district factors, occupancy). They are placeholder estimates, not market data; calibrate them against your own portfolio.
- [ ] Commission rates in `lib/data/plans.ts`. They currently read "Değerlendirme sonrası belirlenir".
- [ ] Plan names and contents in `lib/data/plans.ts`, and the "no fixed fee, commission on revenue" statements on `/pricing`, are proposals to confirm.
- [ ] Review the sample articles and dates in `lib/data/blog.ts`.
- [ ] Replace the stock photographs with your own.
- [ ] Legal texts in `lib/data/legal.ts` reviewed by a lawyer, then `legalDraft` set to `false`.
- [ ] Confirm every service promise in the copy, for example 7/24 guest messaging, a dedicated property manager, and free evaluation.
- [ ] Have the permit FAQ on `/management-plans` and the permit article on `/blog` (Law No. 7464) checked against current regulations.
- [ ] Set `NEXT_PUBLIC_SITE_URL` and `PMS_API_URL`.

## Image credits

Photographs in `public/images` come from [Unsplash](https://unsplash.com) under the [Unsplash License](https://unsplash.com/license). They are placeholders for real property photography.
