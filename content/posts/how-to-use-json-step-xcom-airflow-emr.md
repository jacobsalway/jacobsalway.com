---
title: 'How to read JSON from XCOM on Airflow'
date: '2021-11-18'
tags: [airflow, python, emr, aws]
---

**TL;DR:** The problem is due to the templated string only being interpolated rather than deserialised into its native Python type.
If you're using Airflow 1.x, you'll need to either wrap the receiving operator in a `PythonOperator` like [this](https://stackoverflow.com/a/64950554/2608918)
or subclass the receiving operator's class and deserialise the interpolated string with `json.loads` before calling `.execute()` on the
receiving operator. With Airflow 2.1 or above, you can simply set `render_template_as_native_obj=True` on the DAG object.

The problem: you want to use the JSON or dictionary/list output of a previous operator in Airflow as the value of an argument
being passed to another operator. For example, you might want to be able to override default options in a config object with external
parameters from the `DagRun.conf` object and pass this to an operator. In my previous role, my use case for this functionality was
a set of command line arguments being passed to a Pyspark script run on EMR.

**Example:**

```python
def define_step(**kwargs: DagRun) -> None:
    dag_run: DagRun = kwargs.get('dag_run')
    script_params = config.default_params

    # dag_run.conf only accessible when externally triggered
    if dag_run.external_trigger:
        # parameter on conf object may not exist, so default to empty dict
        manual_params = dag_run.conf.get('params', {})
        script_params = {**config.default_params, **manual_params}

    cli_params = []
    for param, value in script_params.items():
        cli_params.extend([f'--{param}', str(value)])

    return [{
        'action_on_failure': 'CONTINUE',
        'name': 'step_name',
        'hadoop_jar_step': {
            'jar': 'command-runner.jar',
            'args': [
                'spark-submit',
                's3://mybucket/src/script.py',
                *cli_params
            ]
        }
    }]
```

If you then try to use the Jinja templating to pass this value to another operator, you'll get a type error of some sort if the
receiving operator expects a native object. For example, with the below code:

```python
step = EmrAddStepsOperator(
    task_id='step',
    job_flow_id="{{ ti.xcom_pull(task_ids='create_job_flow') }}",
    aws_conn_id='aws_default',
    steps="{{ ti.xcom_pull(task_ids='define_step') }}"
)
```

This issue happens as the `boto3` call inside the operator expects a native Python list rather than a string.
The underlying issue is that **the templated string is not deserialised into its native type**, rather it is simply interpolated
and remains as a string. I'll list my solutions below by Airflow version.

## Airflow 1.x

From what I've gathered, the only way to solve this issue in Airflow 1.x is to deserialise the string used `json.loads` somewhere in the operator code.
You could do this by either creating a class that inherits the receiving operator's class and calls `json.loads` prior to or inside the `execute()` method,
or you could wrap the operator itself in a `PythonOperator` that converts the XCOM value from string to its native type.
I'll add relevant example code and their sources below:

**Subclassing the receiving operator:**

Here's an example for the `EmrAddStepsOperator` that I ended up using at work. Full credits to [Eric Cook](https://stackoverflow.com/users/12684770/eric-cook),
whose code I took from [this Stackoverflow answer](https://stackoverflow.com/questions/58242701/using-json-input-variables-in-airflow-emr-operator-steps/59670311#59670311)
while googling the issue.

```python
from airflow.contrib.hooks.emr_hook import EmrHook
from airflow.exceptions import AirflowException
from airflow.models import BaseOperator
from airflow.utils.decorators import apply_defaults

from airflow.contrib.operators.emr_add_steps_operator import EmrAddStepsOperator
import json

class DynamicEmrStepsOperator(EmrAddStepsOperator):
    template_fields = ['job_flow_id', 'steps']
    template_ext = ()
    ui_color = '#f9c915'

    @apply_defaults
    def __init__(
            self,
            job_flow_id=None,
            steps="[]",
            *args, **kwargs):
        super().__init__(
                job_flow_id = job_flow_id,
                steps = steps,
                *args, **kwargs)

    def execute(self, context):
        self.steps = json.loads(self.steps)
        return super().execute(context)
```

**Wrapping in a PythonOperator:**

I've added the EMR code I was using before to code inspired by [this Stackoverflow answer](https://stackoverflow.com/questions/64895696/airflow-xcom-pull-only-returns-string),
which I also came across when googling the issue.

```python
def step_wrapper(**kwargs):
    ti: TaskInstance = kwargs['ti']
    steps_str = ti.xcom_pull(task_ids='define_step')
    steps = json.loads(steps_str)
    op = EmrAddStepsOperator(
        task_id='step',
        job_flow_id="{{ ti.xcom_pull(task_ids='create_job_flow') }}",
        aws_conn_id='aws_default',
        steps=steps
    )
    op.execute()
```

## Airflow 2.1 or above

If you're using Airflow 2.1 or above, you can implement a one-liner in your DAG code that will fix this issue.
By setting `render_template_as_native_obj=True` on the DAG constructor, the `jinja2` templating
engine that Airflow uses will render templated strings with their native types like `list`, `dict`, or `int`.

I've provided an example below to demonstrate the type passed to the receiving `PythonOperator` is of a native `dict`
type.

```python
def create_config():
    return {
        'key': 'value'
    }


def read_config(config):
    print(type(config))
    print(config)


with DAG(
    "test_render_template",
    schedule_interval=None,
    start_date=datetime.today() - timedelta(days=3),
    render_template_as_native_obj=True
) as dag:
    create_config = PythonOperator(
        task_id="create_config",
        python_callable=create_config
    )

    read_config = PythonOperator(
        task_id="read_config",
        python_callable=read_config,
        op_args=["{{ ti.xcom_pull(task_ids='create_config') }}"]
    )

    create_config >> read_config
```

```log
[2022-04-01, 14:12:32 UTC] {logging_mixin.py:109} INFO - <class 'dict'>
[2022-04-01, 14:12:32 UTC] {logging_mixin.py:109} INFO - {'key': 'value'}
[2022-04-01, 14:12:32 UTC] {python.py:175} INFO - Done. Returned value was: None
```

_This post was updated on April 2, 2022._
