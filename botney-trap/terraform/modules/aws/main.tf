data "aws_eks_cluster" "cluster" {
  count = var.enable_aws ? 1 : 0
  name = module.eks.cluster_id
}

data "aws_eks_cluster_auth" "cluster" {
  count = var.enable_aws ? 1 : 0
  name = module.eks.cluster_id
}

# ******************************************************************
# *********************** VPC configuration ************************
# ******************************************************************

data "aws_availability_zones" "available" {}

resource "random_string" "suffix" {
  count = var.enable_aws ? 1 : 0
  length  = 8
  special = false
}

locals {
  cluster_name = "botney-eks-${element(concat(random_string.suffix[*].result, [""]), 0)}"
}

resource "aws_security_group" "worker_group_mgmt_one" {
  count = var.enable_aws ? 1 : 0
  name_prefix = "worker_group_mgmt_one"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port = 22
    to_port   = 22
    protocol  = "tcp"

    cidr_blocks = [
      "10.0.0.0/8",
    ]
  }
}

resource "aws_security_group" "all_worker_mgmt" {
  count = var.enable_aws ? 1 : 0
  name_prefix = "all_worker_management"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port = 22
    to_port   = 22
    protocol  = "tcp"

    cidr_blocks = [
      "10.0.0.0/8",
      "172.16.0.0/12",
      "192.168.0.0/16",
    ]
  }
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "3.1.0"
  create_vpc = var.enable_aws

  name                 = "botney-vpc"
  cidr                 = "10.0.0.0/16"
  azs                  = data.aws_availability_zones.available.names
  private_subnets      = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets       = ["10.0.3.0/24", "10.0.4.0/24"]
  enable_nat_gateway   = true
  single_nat_gateway   = true
  enable_dns_hostnames = true

  public_subnet_tags = {
    "kubernetes.io/cluster/${local.cluster_name}" = "shared"
    "kubernetes.io/role/elb"                      = "1"
  }

  private_subnet_tags = {
    "kubernetes.io/cluster/${local.cluster_name}" = "shared"
    "kubernetes.io/role/internal-elb"             = "1"
  }
}

# *****************************************************************************
# ************************ AWS EKS ********************************************
# *****************************************************************************


module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  version         = "17.1.0"
  create_eks      = var.enable_aws

  cluster_name    = local.cluster_name
  cluster_version = "1.20"
  subnets         = module.vpc.private_subnets
  vpc_id          = module.vpc.vpc_id

  write_kubeconfig = true
  kubeconfig_output_path = "./"

  enable_irsa = true

  tags = {
    App = "botney"
    GithubRepo  = "terraform-aws-eks"
    GithubOrg   = "terraform-aws-modules"
  }

  # TODO: add variable to set worker nodes
  worker_groups = [
    {
      name                          = "worker-group-1"
      instance_type                 = "t3.medium"
      additional_userdata           = "echo foo bar"
      asg_desired_capacity          = var.number_nodes
      additional_security_group_ids = [element(concat(aws_security_group.worker_group_mgmt_one[*].id, [""]), 0)]
    }
  ]

  worker_additional_security_group_ids = [element(concat(aws_security_group.all_worker_mgmt[*].id, [""]), 0)]
}