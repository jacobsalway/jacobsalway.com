terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.20"
    }
  }

  # populated via partial config
  backend "s3" {}
}

# a stripped/plain version of what's stored in the "sensitive" provider file
# as noted in the .gitignore, account config is not necessarily secret information
# but not something I want to broadcast

# provider "aws" {
#   region = "ap-southeast-2"
# }

# provider "aws" {
#   region = "us-east-1"
#   alias  = "us_east_1"
# }
