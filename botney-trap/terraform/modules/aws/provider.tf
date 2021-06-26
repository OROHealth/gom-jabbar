provider "aws" {
  region  = "${var.aws_region}"
}

provider "kubernetes" {
  host                   = element(concat(data.aws_eks_cluster.cluster[*].endpoint, [""]), 0)
  cluster_ca_certificate = base64decode(element(concat(data.aws_eks_cluster.cluster[*].certificate_authority.0.data, [""]), 0))
  exec {
    api_version = "client.authentication.k8s.io/v1alpha1"
    args        = ["eks", "get-token", "--cluster-name", element(concat(data.aws_eks_cluster.cluster[*].name, [""]), 0)]
    command     = "aws"
  }
}

provider "helm" {
  kubernetes {
    host                   = element(concat(data.aws_eks_cluster.cluster[*].endpoint, [""]), 0)
    cluster_ca_certificate = base64decode(element(concat(data.aws_eks_cluster.cluster[*].certificate_authority.0.data, [""]), 0))
    exec {
      api_version = "client.authentication.k8s.io/v1alpha1"
      args        = ["eks", "get-token", "--cluster-name", element(concat(data.aws_eks_cluster.cluster[*].name, [""]), 0)]
      command     = "aws"
    }
  }
}

