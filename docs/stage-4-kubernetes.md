## Kubernetes Deployment (Backend)

Deployed FastAPI backend using Kubernetes Deployment and Service.

### Components:
- Deployment (1 replica)
- NodePort Service

### Issues Faced:
- Health check failing due to DB dependency
- Docker image caching (same tag reused)

### Fixes:
- Simplified /health endpoint
- Added imagePullPolicy: Always
- Restarted deployment using rollout

### Commands Used:
kubectl apply -f
kubectl get pods
kubectl logs
kubectl rollout restart

### Outcome:
- Backend successfully running on Kubernetes
- Stable health checks
- Proper debugging using logs

## Full System Deployment (Frontend + Backend)

Deployed both frontend and backend services on Kubernetes.

### Issue Faced:
- Frontend could not communicate with backend
- Kubernetes service DNS not accessible from browser

### Temporary Fix:
- Exposed backend using minikube service
- Used external URL in frontend

### Learning:
- Internal service names work only inside cluster
- Browser requires external access
- NodePort/tunnel is not production-ready

### Next Step:
- Implement Ingress for proper routing

## Ingress Introduction

Moved from NodePort-based exposure to Ingress-based routing.

### Motivation:
NodePort is not suitable for production due to lack of routing control and scalability.

### Architecture Change:
Before:
User → NodePort → Service → Pod

After:
User → Ingress → Service → Pod

### Challenges:
- Networking issues in Minikube
- Ingress misconfiguration
- Service accessibility problems

### Outcome:
- Centralized routing
- Cleaner architecture
- Foundation for production deployment

## K3s Deployment on AWS EC2

Migrated Kubernetes setup from Minikube (local) to K3s on AWS EC2.

### Motivation:
- Need for public access
- Simulate real production environment

### Architecture:
Internet → EC2 → K3s → Service → Pod

### Challenges:
- SSH connectivity issues due to dynamic IP
- Low-resource instance limitations
- Kubeconfig permission issues
- Frontend-backend communication mismatch

### Fixes:
- Adjusted Security Groups
- Upgraded instance type
- Configured swap memory
- Updated frontend API base URL

### Outcome:
- Successfully deployed full-stack app on cloud-based Kubernetes
- Publicly accessible services via NodePort

## Production-Style Kubernetes Deployment

Implemented full system deployment with Ingress and CI/CD integration.

### Architecture:
User → EC2 → Ingress → Services → Pods

### CI/CD:
GitHub Actions builds and pushes images → EC2 pulls and deploys via kubectl

### Challenges:
- Ingress not linked to controller (404 errors)
- Remote cluster access issues (timeout)
- Image versioning confusion

### Fixes:
- ingressClassName added
- SSH-based deployment introduced
- rollout restart used for same tag updates

### Outcome:
- Fully automated deployment pipeline
- Clean routing using Ingress
- Production-style architecture