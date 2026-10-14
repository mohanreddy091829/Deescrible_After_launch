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
