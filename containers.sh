#!/bin/bash

docker network inspect "e-commerce-network" > /dev/null
if [ $? -ne 0 ]; then
    docker network create -d bridge e-commerce-network
else 
    echo "network already created"
fi

docker container create \
    --name db \
    --restart unless-stopped \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_DB=prisma_e_commerce \
    -e POSTGRES_PASSWORD_FILE=/run/secrets/db_password \
    --network e-commerce-network \
    -v ecomm:/var/lib/postgresql/data \
    -v $(pwd)/secrets/db_password.txt:/run/secrets/db_password:ro \
    postgres:16


docker container create \
    --name e-commerce-server \
    --restart unless-stopped \
    -e POSTGRES_PASSWORD_FILE=/run/secrets/e_commerce_db_password \
    -e DB_USER=postgres \
    -e DB_HOST=db \
    -e DB_PORT=5432 \
    -e DB_NAME=prisma_e_commerce \
    -e DB_SCHEMA=public \
    --network e-commerce-network \
    -v $(pwd)/secrets/db_password.txt:/run/secrets/db_password.txt:ro \
    backend:e-commerce


docker container create \
    --name frontend \
    --restart unless-stopped \
    --network e-commerce-network \
    -v pgdata:/var/lib/postgresql/data \
    frontend:e-commerce