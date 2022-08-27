resource "aws_glue_catalog_table" "cloudfront_logs_catalog_table" {
  name          = "cloudfront_logs"
  database_name = "default"

  table_type = "EXTERNAL_TABLE"

  parameters = {
    EXTERNAL                 = "TRUE"
    "skip.header.line.count" = "2"
  }

  storage_descriptor {
    location      = "s3://cloudfront-logs-424518242023/jacobsalway.com/processed/"
    input_format  = "org.apache.hadoop.mapred.TextInputFormat"
    output_format = "org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat"

    ser_de_info {
      name                  = "serde"
      serialization_library = "org.apache.hadoop.hive.serde2.lazy.LazySimpleSerDe"

      parameters = {
        "field.delim" : "\t"
        "serialization.format" : "\t"
      }
    }

    dynamic "columns" {
      for_each = jsondecode(file("${path.module}/data/cloudfront_log_schema.json"))
      content {
        name = columns.value.name
        type = columns.value.type
      }
    }
  }
}
