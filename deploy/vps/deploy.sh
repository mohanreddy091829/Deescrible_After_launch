#!/usr/bin/env bash
# Run on the server from the project folder to publish a new version:  bash deploy/vps/deploy.sh
set -euo pipefail
git pull --ff-only
npm ci
npm run build
pm2 startOrReload deploy/vps/ecosystem.config.cjs --update-env
pm2 save
echo "Deployed."
