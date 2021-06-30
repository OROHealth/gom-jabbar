data "digitalocean_kubernetes_versions" "version" {
  version_prefix = "1.21."
}
resource "random_string" "suffix" {
  count   = var.enable_digitalocean ? 1 : 0
  length  = 5
  special = false
  lower   = true
  upper   = false
}

locals {
  cluster_name = "botney-${element(concat(random_string.suffix[*].result, [""]), 0)}"
}

resource "digitalocean_kubernetes_cluster" "botney" {
  count   = var.enable_digitalocean ? 1 : 0
  name    = "${local.cluster_name}"
  region  = "${var.digitalocean_region}"
  version = data.digitalocean_kubernetes_versions.version.latest_version

  node_pool {
    name       = "worker-pool"
    size       = "${var.node_size_do}"
    node_count = var.number_nodes_do
  }
}

resource "local_file" "kubeconfig_file" {
  content     = element(concat(resource.digitalocean_kubernetes_cluster.botney[*].kube_config.0.raw_config, [""]), 0)
  filename = "${path.module}/kubeconfig"
}