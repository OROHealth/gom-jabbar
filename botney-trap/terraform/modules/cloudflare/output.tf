output "name_servers" {
  description = "DNS name servers."
  value       = cloudflare_zone.dns_botney.name_servers
}