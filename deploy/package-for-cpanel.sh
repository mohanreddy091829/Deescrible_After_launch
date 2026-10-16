#!/usr/bin/env bash
# Builds the site for your real domain and makes ONE zip to upload in cPanel > File Manager.
# Usage:  bash deploy/package-for-cpanel.sh https://yourdomain.com
set -euo pipefail
DOMAIN="${1:-}"
[[ "$DOMAIN" =~ ^https://[a-z0-9.-]+\.[a-z]{2,}$ ]] || { echo "Usage: bash deploy/package-for-cpanel.sh https://yourdomain.com  (https, no trailing slash)"; exit 1; }
cd "$(dirname "$0")/.."
rm -rf .next
# the domain is baked into the pages (canonical links, sitemap, share previews), so it must be set at build time
NEXT_PUBLIC_SITE_URL="$DOMAIN" npx next build
OUT="deescribble-upload"
rm -rf "$OUT" "$OUT.zip"
mkdir -p "$OUT"
cp -R .next "$OUT/.next"
rm -rf "$OUT/.next/cache" "$OUT/.next/dev"
cp -R public "$OUT/public"
cp package.json package-lock.json next.config.ts "$OUT/"
cp deploy/cpanel-app.js "$OUT/app.js"
# safety net: never ship secrets
if grep -rIlE "sb_secret_|SESSION_SECRET=|ADMIN_PASSWORD=" "$OUT" >/dev/null 2>&1; then echo "STOP: a secret was found in the package"; exit 1; fi
( cd "$OUT" && zip -qr "../$OUT.zip" . -x "*.DS_Store" )
rm -rf "$OUT"
echo "Created $OUT.zip ($(du -h "$OUT.zip" | cut -f1)) for $DOMAIN"
