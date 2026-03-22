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

## Docker Compose Orchestration

The microservices stack is orchestrated using Docker Compose.

Services included:

- React frontend container
- FastAPI backend container
- PostgreSQL database container

Docker Compose provides internal networking, service discovery, and simplified multi-container management.

## Frontend-Backend Integration

The React frontend communicates with the FastAPI backend via REST APIs.

Key endpoints:

- /health → backend health status
- /db-check → database connectivity

Important considerations:

- API calls use localhost since requests originate from the browser
- CORS is enabled in FastAPI to allow cross-origin communication

## CI Pipeline Integration

The project uses GitHub Actions to automate the build and push process.

Workflow:

- Code push triggers pipeline
- Docker images are built for frontend and backend
- Images are pushed to Docker Hub

This ensures a consistent and automated build process.