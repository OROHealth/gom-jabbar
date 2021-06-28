output "region" {
  description = "AWS region."
  value       = var.aws_region
}

output "name_servers" {
  description = "AWS DNS servers"
  value       = element(concat(resource.aws_route53_zone.primary[*].name_servers, [""]), 0)
}

output "ingress_hostname_aws" {
  description = "AWS Ingress IP"
  value       = data.kubernetes_service.ambassador_loadbalancer.status.0.load_balancer.0.ingress.0.hostname
}

output "cert_manager_irsa_role_arn" {
  value = module.cert_manager_irsa.iam_role_arn
}

output "hosted_zone_id" {
  value = element(concat(resource.aws_route53_zone.primary[*].zone_id, [""]), 0)
}