## Terraform + CI/CD Integration

Integrated Infrastructure as Code concepts with the deployment pipeline.

### Terraform Responsibilities:
- Provision EC2 instances
- Configure Security Groups
- Expose infrastructure outputs

### CI/CD Responsibilities:
- Build Docker images
- Push versioned artifacts
- Deploy workloads onto Kubernetes

### Practical Constraints:
Cluster bootstrap tasks such as:
- K3s installation
- kubectl setup
- repository cloning

were kept partially manual due to free-tier resource limitations.

### Outcome:
- Automated infrastructure provisioning
- Automated deployment lifecycle
- Realistic production-style separation of responsibilities