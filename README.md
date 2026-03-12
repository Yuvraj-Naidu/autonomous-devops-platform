# Autonomous DevOps Platform

A production-style DevOps platform evolving from Docker-based CI/CD to Terraform infrastructure automation, Kubernetes orchestration, and AI-assisted operations.

## Stage 1 — Multi-Service Platform (Docker Compose)

The platform now runs a **multi-container architecture** using Docker Compose.

Services included:

- FastAPI Backend API
- PostgreSQL Database

Docker Compose orchestrates both services and creates an internal network for communication.

### Architecture

Browser
↓
FastAPI Backend (Container)
↓
PostgreSQL Database (Container)

### Run the Platform

Navigate to the docker folder:

cd docker
docker compose up --build

API Endpoints

Health check:

http://localhost:8000/health

Database connectivity check:

http://localhost:8000/db-check

The /db-check endpoint verifies that the backend service can successfully connect to the PostgreSQL database.
