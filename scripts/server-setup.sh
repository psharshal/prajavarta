#!/usr/bin/env bash
# One-time server provisioning for Prajavarta on Ubuntu 22.04 / Debian 12
# Run as root: bash scripts/server-setup.sh

set -euo pipefail

DOMAIN="prajavarta.com"
APP_DIR="/var/www/prajavarta"
LOG_DIR="/var/log/prajavarta"
DB_NAME="prajavarta"
DB_USER="prajavarta"

echo "==> [1/8] System packages"
apt-get update -qq
apt-get install -y -qq curl git unzip nginx certbot python3-certbot-nginx ufw

echo "==> [2/8] Node.js 20 LTS"
if ! command -v node &>/dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y -qq nodejs
fi
echo "Node $(node -v)  npm $(npm -v)"

echo "==> [3/8] PM2"
npm install -g pm2@latest
pm2 startup systemd -u www-data --hp /var/www 2>/dev/null || true

echo "==> [4/8] MariaDB"
apt-get install -y -qq mariadb-server
systemctl enable --now mariadb

# Prompt for DB password
read -rsp "Enter a password for the MariaDB '$DB_USER' user: " DB_PASS
echo ""

mysql -e "
  CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASS}';
  GRANT ALL PRIVILEGES ON \`${DB_NAME}\`.* TO '${DB_USER}'@'localhost';
  FLUSH PRIVILEGES;
"
echo "Database '$DB_NAME' and user '$DB_USER' created."
echo ""
echo "  DATABASE_URL=mysql://${DB_USER}:${DB_PASS}@localhost:3306/${DB_NAME}"
echo ""

echo "==> [5/8] Directory structure"
mkdir -p "${APP_DIR}" "${LOG_DIR}"
mkdir -p "${APP_DIR}/public/uploads"
chown -R www-data:www-data "${APP_DIR}" "${LOG_DIR}"

echo "==> [6/8] Nginx config"
cp "$(dirname "$0")/../nginx/prajavarta.conf" /etc/nginx/sites-available/prajavarta.conf
ln -sf /etc/nginx/sites-available/prajavarta.conf /etc/nginx/sites-enabled/prajavarta.conf
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo "==> [7/8] Firewall"
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
ufw status

echo "==> [8/8] SSL certificate (Let's Encrypt)"
certbot --nginx -d "${DOMAIN}" -d "www.${DOMAIN}" --non-interactive --agree-tos \
  --email "admin@${DOMAIN}" --redirect || echo "Certbot skipped — run manually once DNS is pointed."

echo ""
echo "Server setup complete."
echo "Next: run scripts/deploy.sh to deploy the app."
