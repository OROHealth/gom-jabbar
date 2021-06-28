resource "kubernetes_namespace" "consul_namespace" {
  count   = var.enable_aws ? 1 : 0
  metadata {
    name = "consul"
  }
}

resource "helm_release" "consul" {
  count      = var.enable_aws ? 1 : 0
  name       = "consul"
  repository = "https://helm.releases.hashicorp.com"
  chart      = "consul"
  version    = "0.32.0"
  timeout    = 3600
  namespace  = element(concat(resource.kubernetes_namespace.consul_namespace[*].metadata.0.name, [""]), 0)

  set {
    name  = "global.name"
    value = "consul"
  }

  set {
    name  = "global.datacenter"
    value = "dc1"
  }

  set {
    name  = "global.metrics.enabled"
    value = true
  }

  set {
    name  = "global.federation.enabled"
    value = true
  }

  set {
    name  = "global.federation.createFederationSecret"
    value = true
  }

  set {
    name  = "global.tls.enabled"
    value = true
  }

  set {
    name  = "global.tls.httpsOnly"
    value = false
  }

  set {
    name  = "server.replicas"
    value = 1
  }

  set {
    name  = "ui.enabled"
    value = true
  }

  set {
    name  = "ui.metrics.enabled"
    value = true
  }

  set {
    name  = "meshGateway.enabled"
    value = true
  }

  set {
    name  = "meshGateway.replicas"
    value = 1
  }

  set {
    name  = "connectInject.enabled"
    value = true
  }

  set {
    name  = "controller.enabled"
    value = true
  }

  set {
    name  = "prometheus.enabled"
    value = true
  }

}
