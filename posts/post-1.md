---
title: 'How to implement (fast) mean encoding in Pyspark'
date: '2021-01-01'
---

Create a file called `test.py` below and put this code into it:

```python
# global mean
g_mean = float(df.agg({'LABEL': 'mean'}).collect()[0][0])

# this row is intended for batch encoding cases where value is not in vocabulary
# replace missing mean encoding with global mean
g_mean_df = spark.createDataFrame(
    [('g', 'mean', g_mean)], ['column_name', 'column_value', 'mean_encoding']
)

return melt(df, ['ROW_NUM'], cols, 'column_name', 'column_value')\
    .join(df.select('ROW_NUM', 'LABEL'), 'ROW_NUM')\
    .groupby('column_name', 'column_value')\
    .agg(F.count('LABEL').alias('local_count'), F.mean('LABEL').alias('local_mean'))\
    .withColumn('mean_encoding',
        (F.col('local_mean') * F.col('local_count') + alpha * g_mean)
        / (F.col('local_count') + alpha)
    )\
    .withColumn('mean_encoding', col('mean_encoding').astype('float'))\
    .select('column_name', 'column_value', 'mean_encoding')\
    .unionAll(g_mean_df)
```