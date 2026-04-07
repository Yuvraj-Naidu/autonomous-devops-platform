## Documentation

Detailed project documentation is available in the docs directory.

- Architecture overview
- Microservices design
- Local setup guide
- Frontend service setup
- Docker Compose platform orchestration
- Frontend to backend API integration
- CI pipeline for automated Docker build and push
- EC2 deployment automated using GitHub Actions (CI/CD)
- Implemented port-based deployment strategy to reduce downtime during container updates
- Added NGINX reverse proxy for centralized routing and production readiness
- Implemented blue-green deployment with NGINX for zero downtime traffic switching
- Added health check validation before switching traffic to ensure safe deployments