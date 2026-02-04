#!/bin/sh
set -e

if [ ! -s /run/secrets/db_password.txt ]; then
  echo "Database password secret is missing or empty" >&2
  exit 1
fi

DB_PASSWORD="$(cat /run/secrets/db_password.txt)"

export DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=${DB_SCHEMA}"
echo "DATABASE_URL initialized"

unset DB_PASSWORD

exec "$@"
