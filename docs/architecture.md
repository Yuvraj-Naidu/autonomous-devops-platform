# Autonomous DevOps Platform — Architecture Evolution

This document represents the evolution of the system from local development to a containerized, orchestrated, and API-integrated DevOps platform.

---

## Stage 0 — Local Development

```
[ Browser ]
↓
[ React App (npm start) ]
↓
[ FastAPI Backend (uvicorn) ]
↓
[ PostgreSQL (local DB) ]
```

### Key Characteristics
- Services run independently on local machine
- Manual startup required
- No environment consistency

---

## Stage 1 — Containerization (Docker)

```
[ Browser ]
↓
[ React Container ]
↓
[ FastAPI Container ]
↓
[ PostgreSQL Container ]
```

### Key Characteristics
- Each service packaged as Docker image
- Consistent runtime environment
- Eliminates "works on my machine" issue

---

## Stage 2 — Multi-Service Orchestration (Docker Compose)

```
docker-compose
├── frontend (React)
├── backend (FastAPI)
└── postgres (DB)

[ Browser ]
↓
[ frontend:3000 ]
↓
[ backend:8000 ]
↓
[ postgres:5432 ]
```

### Internal Networking

```
frontend → backend:8000
backend → postgres:5432
```

### Key Characteristics
- Single command startup → docker compose up
- Internal networking via service names
- Dependency management using depends_on

---

## Stage 3 — API Integration (Real Dashboard)

```
[ Browser (User) ]
↓
[ React Dashboard UI ]
↓ (HTTP Requests)
[ FastAPI Backend API ]
↓
[ PostgreSQL Database ]
```

## Stage 4 — CI Pipeline 

```
GitHub (code push)
↓
GitHub Actions (CI)
↓
Build Docker Images
↓
Push to Docker Hub
```

### Key Characteristics
- Automated builds on every commit
- Docker images pushed to registry
- Eliminates manual build process

---

## Stage 5 — Deployment Strategy (Zero-Downtime Release)

Port-Based Deployment Model

Current Version (Live Traffic)  
- frontend → port 3000  
- backend → port 8000  

New Version (Candidate Release)  
- frontend → port 3001  
- backend → port 8001  

Deployment Flow

1. Deploy new containers on alternate ports  
2. Validate backend → GET /health, GET /db-check  
3. Validate frontend UI accessibility  
4. Ensure containers are stable and running  
5. Switch traffic to new version  
6. Remove old containers  
7. Clean up unused containers and ports  

Key Characteristics
- Near zero downtime deployments  
- Safe validation before release  
- Rollback possible (old version still active during validation)  
- Prevents broken deployments from affecting users  

---

## Updated Current Architecture (Day 23)

```
Browser (http://localhost:3000)
↓
React Frontend (Container : 3000)
↓
FastAPI Backend (Container : 8000)
↓
PostgreSQL Database (Container : 5432)

Parallel Deployment Layer

New Version (Validation Phase)

frontend → http://localhost:3001
backend → http://localhost:8001
```
---

## System Control
```
docker compose up --build -d
```

Deployment (Alternate Ports handled manually/scripted)

---

## What This Architecture Demonstrates
```
- Microservices architecture  
- Docker containerization  
- Docker Compose orchestration  
- Service-to-service communication  
- API-driven frontend integration  
- CI pipeline automation (GitHub Actions)  
- Real-time system visibility  
- Docker networking concepts (internal vs external)  
- Zero-downtime deployment strategy (port-based validation)  
```
---

## 🚀 Next Evolution

```
GitHub Push
↓
CI Pipeline (GitHub Actions - Implemented)
↓
Docker Hub (Image Registry)
↓
CD Pipeline (Automated EC2 Deployment)
↓
Reverse Proxy / Load Balancer (Nginx)
↓
Kubernetes (Scaling & Orchestration)
↓
AI DevOps Layer (Self-healing + Intelligent Deployments)
```

