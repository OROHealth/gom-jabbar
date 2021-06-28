module "aws_infra" {
  source           = "./modules/aws"
  enable_aws       = var.enable_aws
  aws_region       = "${var.aws_region}"
  number_nodes_aws = var.number_nodes_aws
  node_size_aws    = "${var.node_size_aws}"
}

module "digitalocean_infra" {
  source                   = "./modules/digitalocean"
  enable_digitalocean      = var.enable_digitalocean
  digitalocean_region      = "${var.digitalocean_region}"
  number_nodes_do          = var.number_nodes_do
  node_size_do             = "${var.node_size_do}"
}


module "cloudflare_dns" {
  source                   = "./modules/cloudflare"
  enable_aws               = var.enable_aws
  enable_digitalocean      = var.enable_digitalocean
  domain                   = "${var.domain}"
  environments             = var.environments
  weight_aws               = var.weight_aws
  weight_digitalocean      = var.weight_digitalocean
  aws_ingress              = module.aws_infra.aws_ingress
  digitalocean_ingress     = module.digitalocean_infra.digitalocean_ingress
}




