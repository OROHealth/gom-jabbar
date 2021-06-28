provider "kubernetes" {
  host                   = element(concat(resource.digitalocean_kubernetes_cluster.botney[*].endpoint, [""]), 0)
  cluster_ca_certificate = base64decode(element(concat(resource.digitalocean_kubernetes_cluster.botney[*].kube_config.0.cluster_ca_certificate, [""]), 0))

  exec {
    api_version = "client.authentication.k8s.io/v1beta1"
    command     = "doctl"
    args        = ["kubernetes", "cluster", "kubeconfig", "exec-credential",
    "--version=v1beta1", element(concat(resource.digitalocean_kubernetes_cluster.botney[*].id, [""]), 0)]
  }
}

provider "helm" {
  kubernetes {
    host                   = element(concat(resource.digitalocean_kubernetes_cluster.botney[*].endpoint, [""]), 0)
    cluster_ca_certificate = base64decode(element(concat(resource.digitalocean_kubernetes_cluster.botney[*].kube_config.0.cluster_ca_certificate, [""]), 0))

    exec {
      api_version = "client.authentication.k8s.io/v1beta1"
      command     = "doctl"
      args        = ["kubernetes", "cluster", "kubeconfig", "exec-credential",
      "--version=v1beta1", element(concat(resource.digitalocean_kubernetes_cluster.botney[*].id, [""]), 0)]
    }
  }
}

