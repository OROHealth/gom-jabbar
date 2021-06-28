output "dns_name_servers" {
  description = "DNS name servers."
  value       = module.cloudflare_dns.name_servers
}