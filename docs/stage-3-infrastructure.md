## Infrastructure as Code (Terraform) - DAY 31

Introduced Terraform to automate EC2 provisioning.

### Approach:
- Defined AWS provider (ap-south-1)
- Created EC2 instance resource
- Used IAM credentials via aws configure

### Workflow:
1. terraform init
2. terraform plan
3. terraform apply

### Challenges:
- Credential configuration issue ("No valid credential sources found")
- Instance type compatibility (t2.micro → t3.micro)

### Outcome:
- Fully automated EC2 provisioning
- Eliminated manual AWS console dependency

## Infrastructure as Code (Terraform) - DAY 32-33

Automated EC2 and Security Group provisioning using Terraform.

### Components:
- AWS EC2 instance (t3.micro)
- Security group (HTTP + SSH access)

### Configuration:
- Variables used for region, instance type, key pair
- tfvars used for environment-specific values

### Workflow:
terraform init → terraform plan → terraform apply → terraform destroy

### Challenges:
- AWS credential configuration
- Instance type compatibility
- Understanding variable mapping

### Outcome:
- Fully automated infrastructure
- No manual AWS setup
- Clean and reusable configuration