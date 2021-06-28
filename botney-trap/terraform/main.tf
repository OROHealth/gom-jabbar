module "aws_infra" {
  source          = "./modules/aws"
  enable_aws      = var.enable_aws
  aws_region
}

module "digitalocean_infra" {
  source          = "./modules/digitalocean"
  enable_aws      = var.enable_aws
  aws_region

}