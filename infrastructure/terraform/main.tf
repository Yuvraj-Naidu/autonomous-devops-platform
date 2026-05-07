provider "aws" {
  region = var.region
}

resource "aws_instance" "devops_server" {
  ami           = "ami-07216ac99dc46a187" # updated Ubuntu
  instance_type = var.instance_type

  key_name = "devops-key" # AWS key

  vpc_security_group_ids = [aws_security_group.devops_sg.id]

  tags = {
    Name        = var.server_name # server name
    Project     = var.project_name # project name 
    Environment = var.environment
  }
}

resource "aws_security_group" "devops_sg" {
  name        = "devops-sg"
  description = "Allow web and SSH access"

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
