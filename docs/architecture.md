# Platform Architecture

The Autonomous DevOps Platform is designed as a microservices-based system that evolves through multiple stages of DevOps maturity.

## Current Architecture (Stage 1)

Browser
↓
FastAPI Backend
↓
PostgreSQL Database

Both services run as containers and are orchestrated using Docker Compose.

## Service Responsibilities

### Backend Service
Technology: FastAPI

Responsibilities:
- Provide REST API endpoints
- Handle business logic
- Connect to the database
- Provide health check endpoints

### Database Service
Technology: PostgreSQL

Responsibilities:
- Store application data
- Maintain deployment records
- Store service health information

## Container Communication

Docker Compose creates an internal network where services communicate using service names.

Example:

backend → postgres:5432
