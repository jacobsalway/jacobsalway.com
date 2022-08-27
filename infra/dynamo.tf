resource "aws_dynamodb_table" "posts_table" {
  name           = "posts"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1

  attribute {
    name = "id"
    type = "S"
  }

  hash_key = "id"
}
