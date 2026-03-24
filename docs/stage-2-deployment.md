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