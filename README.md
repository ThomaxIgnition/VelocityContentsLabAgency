# Velocity Contents Lab

**Where Strategy Meets Soul.**

Velocity Contents Lab is a Lagos-to-global content strategy and automation agency. This repository holds the agency's website, including **Cal**, our AI customer care assistant.

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Motion (animations)
- n8n (powers Cal, the AI assistant)

## Run locally

Prerequisite: Node.js 18+

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000.

## Configuration

| Setting | What it does |
| --- | --- |
| `VITE_LEAD_WEBHOOK_URL` | Where contact-form enquiries are sent (for example an n8n webhook that emails you and logs the lead to Google Sheets). Without it, the form opens the visitor's email app addressed to velocitycontentslab@gmail.com. Set it in your hosting provider's environment variables. |

Company facts, services, pricing, and testimonials all live in [`src/content.ts`](src/content.ts). Edit that one file to update the site.

To show the founder's photo, add it as `public/photos/founder.jpg` (portrait, about 1200×1500).

## Private admin dashboard

The admin dashboard (the book editor and content calendar) is a separate site in [`admin/`](admin/). It is never included in the public website. Chapters and calendar posts are stored in Supabase; published chapters appear on the website automatically.

```bash
npm run dev:admin    # runs at http://localhost:3001
npm run build:admin  # output in dist-admin/
```

Deploy it with `npx wrangler deploy --config wrangler.admin.jsonc`. Sign-in uses Supabase accounts; only emails listed in the `admins` table can read or change data (enforced by row-level security).

## Build for production

```bash
npm run build
```

The production files are written to `dist/`. Any static host can serve them, such as Vercel, Netlify, or Cloudflare Pages.

---

© Velocity Contents Lab. All rights reserved.
