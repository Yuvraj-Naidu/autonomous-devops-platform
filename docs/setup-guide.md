# Local Development Setup

## Prerequisites

Install:

- Docker
- Docker Compose

## Clone Repository

git clone <repository-url>

cd autonomous-devops-platform

## Start the Platform

Navigate to the docker directory:

cd docker

Run:

docker compose up --build

## Verify Services

Backend API:

http://localhost:8000

Health endpoint:

http://localhost:8000/health

Database check:

http://localhost:8000/db-check
