#!/bin/bash

echo "Stopping containers and removing volumes..."
docker compose down -v

echo "Building microservices..."
cd micro-services
mvn clean install -DskipTests
cd ..

echo "Building and starting containers..."
docker compose up --build -d

echo "Done! Services are starting up..."