resource "kubernetes_namespace" "ambassador_namespace" {
  count = var.enable_digitalocean ? 1 : 0
  metadata {
    name = "ambassador"
  }
}

module "ambassador" {
  count = var.enable_digitalocean ? 1 : 0

  source           = "basisai/ambassador/helm"
  version          = "0.1.2"
  chart_timeout    = 3600
  chart_version    = "6.7.11"
  chart_namespace  = element(concat(resource.kubernetes_namespace.ambassador_namespace[*].metadata.0.name, [""]), 0)
  chart_name       = "ambassador"
}

data "kubernetes_service" "ambassador_loadbalancer" {
  metadata {
    name      = "ambassador"
    namespace = "ambassador"
  }

  depends_on = [ module.ambassador ]
}