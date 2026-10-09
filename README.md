# Dedeepya Abbagani — portfolio

Single-page portfolio built with Next.js 16 (App Router), React 19, Tailwind CSS 4, GSAP and Motion.

## Run locally

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL
npm run dev                  # http://localhost:3000
npm run typecheck && npm run lint && npm run build
```

Requires Node 20.9+.

## Structure

| Path | What lives there |
| --- | --- |
| `app/` | Layout (metadata, JSON-LD, fonts), page, `robots.ts`, `sitemap.ts`, global CSS |
| `components/<section>/` | One folder per page section (hero, brand-marquee, journey, expertise, selected-work, deescribble, stories-beyond-brands, booking, footer) |
| `components/ui/` | Shared primitives (Modal, NoiseBackground, TiltedGridHero) |
| `data/` | All copy and content (projects, expertise, stories, reels, brands, site config) — edit here, not in components |
| `public/assets/` | Optimised images; reels go in `public/assets/reels/videos/` (see README there) |
| `_archive/` | **Git-ignored.** Client source material and superseded assets; never deployed |

## Before launch checklist

1. `data/site-config.ts`: replace the placeholder enquiry email and phone.
2. Set `NEXT_PUBLIC_SITE_URL` to the real domain (canonical URLs, sitemap, Open Graph).
3. `data/stories.ts`: replace the `TODO` URLs with the real talk and article links.
4. `data/reels.ts`: add MP4 + poster files for her reels.
5. Replace stock photos (credited in each dialog) with her own where available.

## Deploy

**Vercel (recommended, zero config):** import the GitHub repo, add `NEXT_PUBLIC_SITE_URL`, deploy. Security headers come from `next.config.ts`.

**Cloudflare:** Next.js 16 needs the OpenNext adapter (`@opennextjs/cloudflare`) on Workers; the static-only Pages mode will not work because the site uses Cache Components. Test a preview deployment first. Alternatively keep the site on Vercel and put Cloudflare in front as DNS/CDN.

## Security notes

- Strict CSP, HSTS, `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy and Permissions-Policy are set in `next.config.ts`. Nothing is loaded from third-party origins at runtime.
- The booking form is client-only: it sends nothing to a server and ends in a `mailto:` link. If you add a backend, add validation, rate limiting and a CSP `connect-src` entry.
- `.env*` (except `.env.example`) is git-ignored. No secrets are used.
