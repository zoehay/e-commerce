#!/bin/sh

MAX_ATTEMPTS=30
SLEEP_SECONDS=5

check_database() {
    pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" 
}

# install checks
location1=$(type openssl)
echo "Location of program: $location1"
location2=$(type postgresql-client)
echo "Location of program: $location2"

echo "waiting for database"
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
    echo "Database is ready"

    echo "Running Prisma migrations"
    npx prisma migrate deploy
    npx prisma generate
    npx prisma db seed

    echo "Starting application"

    exec node src/index.js
fi