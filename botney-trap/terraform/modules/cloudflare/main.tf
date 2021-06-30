resource "cloudflare_zone" "dns_botney" {
  zone = "${var.domain}"
}


resource "cloudflare_record" "records" {
  # those records who has one origin can be routed as a normal DNS record
  for_each = {for idx, env in jsondecode(var.environments): idx => env if length(env.origins) == 1}
  zone_id = cloudflare_zone.dns_botney.id
  name = "${each.value.subdomain}.${var.domain}"
  # TODO: this only supports digitalocean and aws
  value   = each.value.origins[0] == "aws" ? "${var.aws_ingress}" : "${var.digitalocean_ingress}"
  # INFO: CNAME for aws records and A for digitalocean
  type    = each.value.origins[0] == "aws" ? "CNAME" : "A"
  ttl     = 1
  proxied = true
}


resource "cloudflare_load_balancer" "loadbalancers" {
  # If the environment has more than one origin, that means we have to loadbalancing traffic between them.
  for_each = {for idx, env in jsondecode(var.environments): idx => env if length(env.origins) > 1}
  zone_id = cloudflare_zone.dns_botney.id
  name = "${each.value.subdomain}.${var.domain}"

  fallback_pool_id = cloudflare_load_balancer_pool.botneypool.id
  default_pool_ids = [cloudflare_load_balancer_pool.botneypool.id]
  description = "Botney load balancer using geo-balancing ${each.key}"
  proxied = true
  steering_policy = "geo"
}


resource "cloudflare_load_balancer_pool" "botneypool" {
  name = "botney-lb-pool"
  description = "botney load balancer pool"
  enabled = true
  check_regions = ["ENAM"]

  # TODO: to support more than 2 origins the script has to use a cloudflare account with that amount of origins.
  # https://developers.cloudflare.com/load-balancing/understand-basics/load-balancers
  origins {
    name = "botney-aws"
    address = "${var.aws_ingress}"
    enabled = var.enable_aws
    # weight = contains(keys(each.value.origins), "aws") ? each.value.origins.aws.weight : 0
    weight = var.weight_aws
  }

  origins {
    name = "botney-digitalocean"
    address = "${var.digitalocean_ingress}"
    enabled = var.enable_digitalocean
    # weight = contains(keys(each.value.origins), "digitalocean") ? each.value.origins.digitalocean.weight : 0
    weight = var.weight_digitalocean
  }
}