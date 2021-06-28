variable "aws_region" {
  default = "us-west-2"
}

variable "domain" {
  default = "sebastianfranco.me"
}

variable "email" {
  default = "jhonsfran@gmail.com"
}

variable "number_nodes_aws" {
  default = 3
}

variable "node_size_aws" {
  default = "t3.medium"
}

variable "enable_aws" {
  type = bool
  default = true
}

variable "aws_weight" {
  default = 90
}

variable "digitalocean_region" {
  default = "nyc1"
}

variable "number_nodes_do" {
  default = 3
}

variable "node_size_do" {
  default = "s-2vcpu-2gb"
}

variable "enable_digitalocean" {
  type = bool
  default = true
}

variable "digitalocean_weight" {
  default = 10
}