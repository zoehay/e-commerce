#!/bin/bash

docker build -t backend:e-commerce ./backend 

docker build -t frontend:e-commerce ./frontend

docker build -t nginx:e-commerce ./nginx --build-arg CONFIG_FILE="localopensslnginx"

docker build -t nginx:e-commerce ./nginx 

# docker buildx build --platform linux/amd64,linux/arm64 .