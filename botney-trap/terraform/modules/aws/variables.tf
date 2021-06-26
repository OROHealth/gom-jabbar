variable "aws_region" {
  default = "us-west-2"
}

variable "domain" {
  default = "sebastianfranco.me"
}

variable "email" {
  default = "jhonsfran@gmail.com"
}

variable "number_nodes" {
  default = 3
}

variable "enable_aws" {
  type = bool
  default = true
}

variable "aws_weight" {
  default = 90
}