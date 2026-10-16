import type { NextConfig } from "next";

/**
 * Content-Security-Policy. The site loads nothing from third parties at runtime (fonts are self-hosted by
 * next/font, images are local), so everything is locked to 'self'. 'unsafe-inline' is required for Next's
 * inline bootstrap scripts and for the component-injected <style> tags; tighten with nonces if you add a
 * dynamic server.
 */
// The Supabase project address is public (it appears in every image link), so it is safe as a default.
const sbUrl = process.env.SUPABASE_URL || "https://hpwjpzscfmzmzkkrqgrr.supabase.co";
const sbOrigin = /^https:\/\/[a-z0-9]{20}\.supabase\.co$/.test(sbUrl) ? ` ${sbUrl}` : "";
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'" + (process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""),
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: https://*.public.blob.vercel-storage.com${sbOrigin}`,
  "media-src 'self' blob:",
  "font-src 'self' data:",
  "connect-src 'self'" + (process.env.NODE_ENV === "development" ? " ws: wss:" : ""),
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' mailto:",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-site" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
];

const nextConfig: NextConfig = {
  devIndicators: false,
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 90, 92],
    minimumCacheTTL: 31536000,
  },
  cacheComponents: true,
  experimental: { optimizePackageImports: ["lucide-react", "gsap"] },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/admin", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }, { key: "Cache-Control", value: "no-store" }] },
      { source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      // fingerprinted by content in the filename path? No: our assets are stable names, so revalidate daily
      { source: "/assets/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }] },
    ];
  },
};

export default nextConfig;
