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

---

## Stage 6 — Reverse Proxy Layer (NGINX)

NGINX is introduced as the single entry point for all incoming traffic.

### Flow
```
User  
↓  
NGINX (port 80)  
↓  
Frontend (React)  
↓  
Backend (FastAPI)  
↓  
Database (PostgreSQL)  
```
### Key Characteristics
- Single access point for all requests  
- Eliminates direct exposure of container ports  
- Enables traffic routing and control  
- Supports zero-downtime deployments (traffic switching)  
- Improves security and production readiness  

---

## Stage 7 — Blue-Green Deployment (Zero-Downtime Switching)

The system uses a blue-green deployment model controlled via NGINX.

### Versioning
```
- frontend_v1 / backend_v1 → current live version  
- frontend_v2 / backend_v2 → new version  
```
### Flow
```
User  
↓  
NGINX (port 80)  
↓  
Active Version (v1 or v2)  
↓  
Backend  
↓  
Database  
```
### Deployment Logic

1. Deploy v2 containers (alternate version)  
2. Validate v2 using health checks (/health, /db-check) via alternate ports 
3. Update NGINX config to route traffic to v2  
4. Reload NGINX (no downtime)  
5. Stop and remove v1 containers  

### Deployment Safety Layer

Before switching traffic, the system validates the health of new containers.

### Flow

Deploy  
↓  
Health Check (/health, /db-check)  
↓  
Traffic Switch  

### Key Characteristics
- Only healthy containers receive production traffic  
- Prevents faulty deployments from going live  
- Reduces risk of downtime during releases  

### Key Characteristics
- Zero downtime deployments  
- Instant rollback (switch back to v1)  
- Controlled traffic switching via NGINX  
- Production-grade release strategy  

---

## Updated Current Architecture (Day 25)

```
User (Browser)
↓
http://65.2.155.136
↓
NGINX Reverse Proxy (port 80)
↓
React Frontend (Container)
↓
FastAPI Backend (Container)
↓
PostgreSQL Database (Container)

Parallel Deployment Layer

New Version (Validation Phase)

frontend → http://65.2.155.136:3001
backend → http://65.2.155.136:8001
```
---

## System Control
```
Base System Startup

docker compose up --build -d

Deployment (Zero-Downtime Strategy)
- New version deployed on alternate ports (3001 / 8001)
- Validation via direct port access
- Traffic switch handled via NGINX
- Old containers removed post-switch
```
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
- Reverse proxy architecture (NGINX as entry point)
- Blue-Green deployment strategy (NGINX-based traffic switching)
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

