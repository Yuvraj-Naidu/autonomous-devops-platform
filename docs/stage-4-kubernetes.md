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