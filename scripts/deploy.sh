#!/usr/bin/env bash
# Deploy Prajavarta to production server.
# Run on the server as www-data or a deploy user with write access to APP_DIR.
# Usage: bash scripts/deploy.sh

set -euo pipefail

APP_DIR="/var/www/prajavarta"
REPO_URL="https://github.com/psharshal/prajavarta.git"
BRANCH="main"

echo "==> [1/7] Pull latest code"
if [ -d "${APP_DIR}/.git" ]; then
  git -C "${APP_DIR}" fetch origin "${BRANCH}"
  git -C "${APP_DIR}" reset --hard "origin/${BRANCH}"
else
  git clone --branch "${BRANCH}" --depth=1 "${REPO_URL}" "${APP_DIR}"
fi

echo "==> [2/7] Install dependencies"
cd "${APP_DIR}"
npm ci --omit=dev

echo "==> [3/7] Generate Prisma client"
npx prisma generate

echo "==> [4/7] Run database migrations"
npx prisma migrate deploy

echo "==> [5/7] Build Next.js"
npm run build

echo "==> [6/7] Ensure upload directory exists"
mkdir -p public/uploads/news public/uploads/categories \
         public/uploads/authors public/uploads/settings \
         public/uploads/main-advertisement-banner
chown -R www-data:www-data public/uploads

echo "==> [7/7] Restart / start PM2"
if pm2 describe prajavarta &>/dev/null; then
  pm2 reload ecosystem.config.js --env production
else
  pm2 start ecosystem.config.js --env production
fi
pm2 save

echo ""
echo "Deploy complete. App is live."
pm2 status prajavarta
