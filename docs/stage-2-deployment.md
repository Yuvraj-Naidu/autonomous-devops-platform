## Stage 2 — EC2 Deployment via CI/CD

The platform is deployed to an EC2 instance using GitHub Actions.

### Deployment Flow
```
GitHub Push
↓
GitHub Actions (CD)
↓
SSH into EC2
↓
Pull latest Docker images
↓
Stop old containers
↓
Run new containers
```
### Deployment Commands
```
docker stop frontend-react || true
docker stop backend-fastapi || true

docker rm frontend-react || true
docker rm backend-fastapi || true

docker pull yuvrajnaidu/backend-fastapi
docker pull yuvrajnaidu/frontend-react

docker run -d -p 8000:8000 --name backend-fastapi yuvrajnaidu/backend-fastapi
docker run -d -p 3000:3000 --name frontend-react yuvrajnaidu/frontend-react
```
### Key Learnings

- SSH authentication in CI/CD pipelines
- Importance of correct private key formatting
- Remote deployment automation
- Container lifecycle management

## Port-Based Deployment Strategy (Near Zero Downtime)

To reduce downtime during deployments, a port-switching strategy was introduced.

### Approach:
- Existing containers run on:
```
  - Frontend → 3000
  - Backend → 8000
```
- New containers are deployed on:
```
  - Frontend → 3001
  - Backend → 8001
```
### Deployment Flow:
1. Deploy new containers on alternate ports
2. Validate application health (UI/API)
3. Once confirmed, prepare for traffic switch
4. Remove old containers only after validation

### Key Fixes Implemented:
- Switched frontend from React dev server → production build (`serve`)
- Opened required ports in AWS Security Groups
- Enforced fixed container names using `--name`
- Added cleanup step (`docker rm -f`) to avoid port conflicts
- Corrected deployment flow to validate before replacing

### Outcome:
- Reduced downtime during deployments
- Improved deployment reliability
- Production-like deployment behavior achieved

## Reverse Proxy Setup (NGINX)

Introduced NGINX as a reverse proxy to route traffic through a single entry point (port 80).

### Key Learnings:
- Resolved port conflict with host-level nginx service
- Fixed Docker networking issues (containers must share network)
- Debugged 502 Bad Gateway errors due to upstream misconfiguration
- Handled NGINX DNS caching by restarting container
- Optimized workflow using nginx reload instead of rebuild

### Outcome:
- Centralized traffic routing
- Foundation for zero-downtime deployment
- Production-level debugging experience

## Zero Downtime Deployment (Traffic Switching)

Implemented blue-green style deployment using NGINX upstream switching.

### Approach:
- Two versions of services run in parallel (v1 & v2)
- NGINX routes traffic to active version
- Traffic switched by updating upstream config and reloading NGINX

### Flow:
1. Deploy new version (v2)
2. Validate new version
3. Switch traffic via NGINX
4. Keep old version (v1) for rollback

### Outcome:
- Zero downtime achieved
- Safe deployment strategy
- Instant rollback capability

## Deployment Validation (Health Checks)

Added a validation step before traffic switching using health checks.

### Approach:
- Backend exposes `/health` endpoint
- New version is tested using curl before switching

### Flow:
1. Deploy new version
2. Validate health (`/health`)
3. Only switch traffic if healthy

### Outcome:
- Prevents faulty deployments
- Adds safety layer to deployment process