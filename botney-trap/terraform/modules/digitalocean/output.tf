output "cluster_endpoint" {
  description = "Endpoint for EKS control plane."
  value       = element(concat(resource.digitalocean_kubernetes_cluster.botney[*].endpoint, [""]), 0)
}

output "region" {
  description = "Digitalocean region."
  value       = var.digitalocean_region
}