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