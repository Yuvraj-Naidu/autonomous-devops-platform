provider "aws" {
  region = "ap-south-1"
}

resource "aws_instance" "devops_server" {
  ami           = "ami-07216ac99dc46a187" # updated Ubuntu
  instance_type = "t3.micro"

  key_name = "devops-key" # AWS key

  tags = {
    Name        = "autonomous-devops-ec2"
    Project     = "autonomous-devops-platform" # project name 
    Environment = "dev"
  }
}
