output "dns_zone_id" {
  description = "DNS zone id."
  value       = cloudflare_zone.dns_botney.id
}

output "dns_name_servers" {
  description = "DNS name servers."
  value       = cloudflare_zone.dns_botney.name_servers
}