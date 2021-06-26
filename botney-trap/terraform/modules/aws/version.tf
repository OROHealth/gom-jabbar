terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "3.47.0"
    }

    kubernetes = {
      source = "hashicorp/kubernetes"
      version = "2.3.2"
    }

    helm = {
      source = "hashicorp/helm"
      version = "2.2.0"
    }

    local = {
      source = "hashicorp/local"
      version = "2.1.0"
    }

    random = {
      source = "hashicorp/random"
      version = "3.1.0"
    }
  }
}