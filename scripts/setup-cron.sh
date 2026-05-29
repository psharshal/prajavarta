#!/usr/bin/env bash
# Install the system cron job for the scoring endpoint.
# Run once after deploy: bash scripts/setup-cron.sh
# The cron secret must match CRON_SECRET in your .env

set -euo pipefail

CRON_SECRET="${CRON_SECRET:-change-me-cron-secret}"
APP_URL="${NEXT_PUBLIC_API_URL:-https://prajavarta.com}"

CRON_JOB="*/15 * * * * curl -sf -o /dev/null -w '' \"${APP_URL}/api/cron/score?secret=${CRON_SECRET}\" >> /var/log/prajavarta/cron.log 2>&1"

# Install for www-data crontab
(crontab -l -u www-data 2>/dev/null | grep -v "api/cron/score"; echo "${CRON_JOB}") \
  | crontab -u www-data -

echo "Cron job installed for www-data:"
crontab -l -u www-data | grep "cron/score"
