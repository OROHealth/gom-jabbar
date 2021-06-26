resource "random_string" "suffix" {
  count = var.enable_do ? 1 : 0
  length  = 8
  special = false
}

locals {
  cluster_name = "botney-eks-${element(concat(random_string.suffix[*].result, [""]), 0)}"
}

resource "digitalocean_kubernetes_cluster" "cluster" {
  name   = local.cluster_name
  region = "${var.do_region}"
  # Grab the latest version slug from `doctl kubernetes options versions`
  version = "1.20.2-do.0"

  node_pool {
    name       = "worker-pool"
    size       = "s-2vcpu-2gb"
    node_count = 3

    taint {
      key    = "workloadKind"
      value  = "database"
      effect = "NoSchedule"
    }
  }
}
