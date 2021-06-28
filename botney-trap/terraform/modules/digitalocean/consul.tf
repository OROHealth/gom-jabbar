resource "kubernetes_namespace" "consul_namespace" {
  count   = var.enable_digitalocean ? 1 : 0
  metadata {
    name = "consul"
  }
}

resource "helm_release" "consul" {
  count      = var.enable_digitalocean ? 1 : 0
  name       = "consul"
  repository = "https://helm.releases.hashicorp.com"
  chart      = "consul"
  version    = "0.32.0"
  timeout    = 3600
  namespace  = element(concat(resource.kubernetes_namespace.consul_namespace[*].metadata.0.name, [""]), 0)

  values = [
    "${file("consul.yaml")}"
  ]

}
