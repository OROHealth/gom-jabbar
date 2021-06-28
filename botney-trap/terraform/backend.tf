terraform {
  backend "local" {
    path = "./terraform.tfstate"
  }

  # config = {
  #   path = "../learn-terraform-provision-eks-cluster/terraform.tfstate"
  # }
}