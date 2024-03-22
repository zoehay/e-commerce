#!/bin/bash

DB_HOST="db"
DB_PORT="5432"
DB_USER=$db_user
DB_PASSWORD=$db_password
DB_NAME=$db_name

MAX_ATTEMPTS=30
SLEEP_SECONDS=5

check_database() {
    pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" 
}

attempts=0
until check_database || [ "$attempts" -eq "$MAX_ATTEMPTS" ]; do
    echo "Database is not ready, retrying in $SLEEP_SECONDS seconds..."
    sleep "$SLEEP_SECONDS"
    let "attempts++"
done

if [ "$attempts" -eq "$MAX_ATTEMPTS" ]; then
    echo "Error: Database not ready after $((attempts * SLEEP_SECONDS)) seconds."
    exit 1
else
    echo "Database is ready!"

    npx prisma migrate deploy
    npx prisma generate
    npx prisma db seed
    exit 0
fi