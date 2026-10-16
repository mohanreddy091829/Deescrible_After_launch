# Dedeepya Abbagani — portfolio

Single-page portfolio plus a `/consultation` booking page. Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS 4, GSAP.

## Run locally

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL
npm run dev                  # http://localhost:3000
npm run typecheck && npm run lint && npm run build
```

Requires Node 20.9+. If `npm run dev` shows stale errors after a build, delete `.next` and restart.

## Structure

| Path | What lives there |
| --- | --- |
| `app/` | Layout (fonts, metadata, JSON-LD), home page, `/consultation`, `robots.ts`, `sitemap.ts`, global CSS |
| `components/hero` | Hero: red curved photo panel, halftone name, nav + full-screen menu |
| `components/brand-marquee` | Endless logo strip |
| `components/typewriter` | "What we do" typing section |
| `components/moments` | "About Me" fan of photo cards with changing pictures |
| `components/journey` | Pinned, scroll-driven career landscape (desktop) / vertical version (mobile) |
| `components/expertise`, `selected-work`, `deescribble`, `stories-beyond-brands` | Content sections |
| `components/cta`, `components/consultation` | Closing CTA and the booking form |
| `components/ui` | Modal, halftone text engine, tilted-grid reel band |
| `data/` | All copy and content (edit here, not in components) |
| `_archive/` | **Git-ignored**: client source material and retired code |

## Before launch checklist

1. `data/site-config.ts`: replace the placeholder enquiry email and phone.
2. Set `NEXT_PUBLIC_SITE_URL` to the real domain (canonical URLs, sitemap, Open Graph).
3. `data/moments.ts`, `data/archive`-style image lists, `data/projects.ts`, `data/stories.ts`: swap stock placeholder photos (credited in each dialog) for her own; replace the `TODO` article/talk links in `data/stories.ts`.
4. `data/reels.ts`: add MP4 + poster files for her reels (`public/assets/reels/videos/README.md`).
5. The booking form is client-only: confirmation is a `mailto:` link and nothing is sent to a server. Add a backend if you need real scheduling.

## Deploy

**Vercel (recommended, free Hobby plan):** import the GitHub repo, add `NEXT_PUBLIC_SITE_URL`, deploy. Security headers come from `next.config.ts`.

**Cloudflare:** Next.js 16 needs the OpenNext adapter (`@opennextjs/cloudflare`); static-only Pages will not work. Test a preview first, or keep Vercel and use Cloudflare as DNS/CDN.

## Security

Strict CSP, HSTS, `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy and Permissions-Policy are set in `next.config.ts`. Nothing is loaded from third-party origins at runtime. No secrets are used; `.env*` (except `.env.example`) is git-ignored.

## Admin (events and reels) and the enquiry form

- **Admin:** open the menu (hamburger) and tap the small "Admin login" link, or go to `/admin`. Log in with `ADMIN_PASSWORD`. From there add, edit and delete **Events** (title, date, place, text, image, button) and **Reels** (Instagram link + cover image), and read saved **Enquiries**. Press "Publish changes" and the site updates within about 20 seconds. Images are resized and compressed automatically.
- **Setup:** copy `.env.example` to `.env.local` (local) or add the same variables in the host's settings. `ADMIN_PASSWORD` (8+ characters) and `SESSION_SECRET` (16+ random characters) are required; the admin stays locked without them.
- **Storage:** locally, data lives in `.data/` (git-ignored). On Vercel the disk is read-only, so add a **Blob** store to the project (Storage tab) and Vercel sets `BLOB_READ_WRITE_TOKEN`; the admin then saves there automatically.
- **Enquiry form (`/consultation`):** every submission is stored (see Admin > Enquiries). Set `GMAIL_USER` + `GMAIL_APP_PASSWORD` to also receive it by Gmail, `CALLMEBOT_PHONE` + `CALLMEBOT_APIKEY` for a WhatsApp alert, and `WHATSAPP_NUMBER` to show visitors a "Continue on WhatsApp" button.

## Deploying

**Environment variables** (never commit real values; `.env*` is git-ignored, `.env.example` lists every name):

| Variable | Needed | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes | The public address (canonical links, sitemap, share previews) |
| `ADMIN_PASSWORD` | yes | Admin login (10+ characters). Admin stays locked without it |
| `SESSION_SECRET` | yes | Signs the admin session (32+ random characters) |
| `BLOB_READ_WRITE_TOKEN` | on Vercel | Added by Vercel when you create a Blob store; lets the admin save events, reels, enquiries and images |
| `NEXT_PUBLIC_ALLOW_INDEXING` | demo only | Set to `false` on the demo deployment so Google ignores it |
| `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `NOTIFY_EMAIL` | optional | Email delivery of enquiries |
| `CALLMEBOT_PHONE`, `CALLMEBOT_APIKEY` | optional | WhatsApp alert for new enquiries |

**Demo on Vercel:** import the GitHub repo, add the variables above (with `NEXT_PUBLIC_ALLOW_INDEXING=false`), create a Blob store under Storage, deploy.

**Real site on another host:** it needs Node 20.9+ (`npm run build`, then `npm start`) and a server with a persistent disk (the admin stores data in `.data/`), or a host that supports the Vercel Blob token. Static-only hosting will not run the admin or the enquiry form.

**After launch:** submit `https://<your-domain>/sitemap.xml` in Google Search Console (Sitemaps) and use "Request indexing" on the home page.
