# ******************************************************************
# *********************** Route53 - configuration ******************
# ******************************************************************
resource "aws_route53_zone" "primary" {
  count = var.enable_aws ? 1 : 0
  name = var.domain
}

resource "aws_route53_record" "aws" {
  count   = var.enable_aws ? 1 : 0
  zone_id = element(concat(resource.aws_route53_zone.primary[*].zone_id, [""]), 0)
  name    = "*"
  type    = "CNAME"
  ttl     = "300"

  weighted_routing_policy {
    weight = var.aws_weight
  }

  set_identifier = "aws"
  records = [data.kubernetes_service.ambassador_loadbalancer.status.0.load_balancer.0.ingress.0.hostname]
}
