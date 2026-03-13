# Stage 1 — Microservices with Docker Compose

Stage 1 introduces a basic microservices architecture using Docker containers.

## Services

### FastAPI Backend
Provides REST endpoints and application logic.

Endpoints:

/ → Basic service response  
/health → Service health status  
/db-check → Database connectivity check

### PostgreSQL Database
Stores platform operational data.

Tables created automatically via init.sql:

users  
deployments  
service_health

## Orchestration

Docker Compose is used to start and manage multiple services.

Command used to start the platform:

docker compose up --build

This command builds the backend image and starts both containers.

## Networking

Docker Compose automatically creates a shared network.

Services communicate using service names instead of IP addresses.
