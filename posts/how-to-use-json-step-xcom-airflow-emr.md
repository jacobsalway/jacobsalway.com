---
title: 'How to read JSON from XCOM on Airflow'
date: '2021-11-18'
tags: [airflow, python, emr]
---

When using the `EmrAddStepsOperator` at work recently, I came across a situation where I wanted to use the JSON return value of an earlier `PythonOperator` as the step config.
In this operator, I was changing the step parameters (mainly the CLI arguments to the main Spark script) based on some external parameters set in the `dag_run.conf` object, for example like so where I overwrite a set of default parameters with provided ones if they exist:

```python
def define_step(**kwargs: DagRun) -> None:
    dag_run: DagRun = kwargs.get('dag_run')
    script_params = config.default_params

    # dag_run.conf only accessible when externally triggered
    if dag_run.external_trigger:
        script_params = {**config.default_params, **dag_run.conf.get('params', {})}

    cli_params = []
    for param, value in script_params.items():
        cli_params.extend([f'--{param}', str(value)])

    return [{
        'action_on_failure': 'CONTINUE',
        'name': 'step_name',
        'hadoop_jar_step' : {
            'jar' : 'command-runner.jar',
            'args' : [
                'spark-submit',
                's3://mybucket/src/script.py',
                *cli_params
            ]
        }
    }]
```

However, I found if I tried to pull the steps from the operator's return value in XCOM using Airflow's template fields like so:

```python
step = EmrAddStepsOperator(
    task_id='step',
    job_flow_id="{{ ti.xcom_pull(task_ids='create_job_flow', key='return_value') }}",
    aws_conn_id='aws_default',
    steps="{{ ti.xcom_pull(task_ids='define_step', key='return_value') }}"
)
```

I found that I got a validation error from `boto3` complaining about the type of the steps field being a string rather than a list.

## Custom operator

When googling around for this error, I came across [this Stackoverflow answer](https://stackoverflow.com/questions/58242701/using-json-input-variables-in-airflow-emr-operator-steps) to the problem. It seems that the `steps` parameter is not deserialised before `boto3` validates the types. The solution (full props to [Eric Cook](https://stackoverflow.com/users/12684770/eric-cook) for the answer) is to subclass the `EMRAddStepsOperator` and parse the JSON in the `execute()` function prior to calling the superclass method:

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

Since the `steps` parameter is registered in the `template_fields` property of the operator, Airflow will substitute the template before `execute()` is called, so we can parse the JSON string into a native array of dictionaries in Python so that the types are correct for `boto3`.

## Render template as native object

When searching I also found that you can pass `render_template_as_native_obj=True` to the DAG so that the rendered template field returns a native Python object. However, this parameter is only available from Airflow 2.1.0 and up ([See this pull request](https://github.com/apache/airflow/pull/14603)). We haven't upgraded to Airflow 2.0 yet at work so I can't test this option, but it makes the solution cleaner by removing the need for a custom operator. I imagine your code could look like so:

```python
with DAG(
    dag_id='test_dag',
    schedule_interval=None,
    render_template_as_native_obj=True) as dag:

    # create job flow
    ...

    define_step_task = PythonOperator(
        task_id='define_step',
        python_callable=define_step,
        provide_context=True
    )

    # the steps field will be rendered as a native object
    step = EmrAddStepsOperator(
        task_id='step',
        job_flow_id="{{ ti.xcom_pull(task_ids='create_job_flow', key='return_value') }}",
        aws_conn_id='aws_default',
        steps="{{ ti.xcom_pull(task_ids='define_step', key='return_value') }}"
    )

    # wait for step and terminate cluster
    ...

```

## Summary

If you're using Airflow 2.1 or above, setting `render_template_as_native_obj=True` on your DAG seems to be the easiest option. If your Airflow instance doesn't meet the version requirements, you need to create a new operator inheriting from `EmrAddStepsOperator` that parses the templated JSON with `json.loads` beforehand.