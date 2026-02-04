#!/bin/bash

docker build -t backend:e-commerce ./backend 

docker build -t frontend:e-commerce ./frontend

# docker buildx build --platform linux/amd64,linux/arm64 .