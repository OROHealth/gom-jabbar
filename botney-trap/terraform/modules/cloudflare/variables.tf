variable "domain" {
  default = "sebastianfranco.me"
}

variable "environments" {
  default = [
    {
      "name": "production",
      "subdomain": "prod"
      "origins": {
        "aws": {
          "weight": 90
        },
        "digitalocean": {
          "weight": 10
        }
      }
    },
    {
      "name": "testing",
      "subdomain": "test",
      "origins": {
        "aws": {
          "weight": 100
        }
      }
    },
    {
      "name": "development",
      "subdomain": "dev",
      "origins": {
        "digitalocean": {
          "weight": 100
        }
      }
    },
  ]
}

variable "enable_aws" {
  type = bool
  default = true
}

variable "enable_digitalocean" {
  type = bool
  default = true
}