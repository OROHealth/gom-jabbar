variable "aws_region" {
  default = "us-west-2"
}

variable "domain" {
  default = "sebastianfranco.me"
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

variable "environments" {
  default = [
    {
      "name": "production",
      "subdomain": "prod"
      "origins": ["aws", "digitalocean"]
    },
    {
      "name": "testing",
      "subdomain": "test",
      "origins": ["aws","digitalocean"]
    },
    {
      "name": "development",
      "subdomain": "dev",
      "origins": ["digitalocean"]
    },
  ]
}

variable "weight_aws" {
  default = 0.9
}

variable "weight_digitalocean" {
  default = 0.1
}
