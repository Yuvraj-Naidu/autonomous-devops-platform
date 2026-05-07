output "ec2_public_ip" {
  value = aws_instance.devops_server.public_ip
}

output "instance_id" {
  value = aws_instance.devops_server.id
}

output "security_group_id" {
  value = aws_security_group.devops_sg.id
}
