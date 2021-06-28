output "digitalocean_ingress" {
  description = "Digitalocean ingress ip."
  value       = data.kubernetes_service.ambassador_loadbalancer.status.0.load_balancer.0.ingress.0.ip
}