output "aws_ingress" {
  description = "AWS Ingress IP"
  value       = data.kubernetes_service.ambassador_loadbalancer.status.0.load_balancer.0.ingress.0.hostname
}