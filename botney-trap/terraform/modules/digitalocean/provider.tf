provider "digitalocean" {
  token   = var.do_token
  version = ">=1.5.0"
}

provider "kubernetes" {
  host                   = element(concat(data.digitalocean_kubernetes_cluster.cluster[*].endpoint, [""]), 0)
  cluster_ca_certificate = base64decode(element(concat(data.digitalocean_kubernetes_cluster.cluster[*].kube_config.0.cluster_ca_certificate, [""]), 0))

  exec {
    api_version = "client.authentication.k8s.io/v1beta1"
    command     = "doctl"
    args        = ["kubernetes", "cluster", "kubeconfig", "exec-credential",
    "--version=v1beta1", element(concat(data.digitalocean_kubernetes_cluster.cluster[*].id, [""]), 0)]
  }
}

provider "helm" {
  kubernetes {
    host                   = element(concat(data.aws_eks_cluster.cluster[*].endpoint, [""]), 0)
    cluster_ca_certificate = base64decode(element(concat(data.aws_eks_cluster.cluster[*].certificate_authority.0.data, [""]), 0))

    exec {
      api_version = "client.authentication.k8s.io/v1beta1"
      command     = "doctl"
      args        = ["kubernetes", "cluster", "kubeconfig", "exec-credential",
      "--version=v1beta1", element(concat(data.digitalocean_kubernetes_cluster.cluster[*].id, [""]), 0)]
    }
  }
}

