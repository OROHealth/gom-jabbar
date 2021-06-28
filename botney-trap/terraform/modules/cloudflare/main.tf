resource "cloudflare_zone" "dns_botney" {
  zone = "${var.domain}"
}

resource "cloudflare_load_balancer" "environments" {
  for_each = {for idx, env in var.environments: idx  => env}
  zone_id = cloudflare_zone.dns_botney.id
  name = "${each.value.subdomain}.${var.domain}"

  fallback_pool_id = cloudflare_load_balancer_pool.botney-pools-environments[each.key].id
  default_pool_ids = [cloudflare_load_balancer_pool.botney-pools-environments[each.key].id]
  description = "Botney load balancer using geo-balancing ${each.value.name}"
  proxied = true
  steering_policy = "geo"
}

resource "cloudflare_load_balancer_pool" "botney-pools-environments" {
  for_each = {for idx, env in var.environments: idx => env}
  name = "botney-lb-pool-${each.value.name}"
  description = "botney load balancer pool ${each.value.name}"
  enabled = true

  origins {
    name = "botney-aws"
    address = "192.168.0.11"
    enabled = var.enable_aws
    weight = contains(keys(each.value.origins), "aws") ? each.value.origins.aws.weight/100 : 0
  }

  origins {
    name = "botney-digitalocean"
    address = "192.168.0.18"
    enabled = var.enable_digitalocean
    weight = contains(keys(each.value.origins), "digitalocean") ? each.value.origins.digitalocean.weight/100 : 0
  }
}