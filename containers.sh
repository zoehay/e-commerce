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
    -v $(pwd)/secrets/db_password.txt:/run/secrets/db_password.txt:ro \
    postgres:16


docker container create \
    --name backend \
    --restart unless-stopped \
    -e POSTGRES_PASSWORD_FILE=/run/secrets/e_commerce_db_password \
    -e DB_USER=postgres \
    -e DB_HOST=db \
    -e DB_PORT=5432 \
    -e DB_NAME=prisma_e_commerce \
    -e DB_SCHEMA=public \
    -e CORS_ALLOW_ORIGIN='http://localhost:3000 https://localhost:3000' \
    --network e-commerce-network \
    -v $(pwd)/secrets/db_password.txt:/run/secrets/db_password.txt:ro \
    -p 8000:8000 \
    backend:e-commerce


docker container create \
    --name frontend \
    --restart unless-stopped \
    --network e-commerce-network \
    -e REACT_APP_API_URL=http://localhost:8000 \
    -v /usr/src/app/node_modules \
    -p 3000:3000 \
    frontend:e-commerce
