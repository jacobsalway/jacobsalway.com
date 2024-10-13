---
title: Using the Spark operator with the NGINX ingress controller
date: 2024-10-13
---

This is a quick guide on how to use the [Spark operator](https://github.com/kubeflow/spark-operator) and [NGINX ingress controller](https://github.com/kubernetes/ingress-nginx)
to expose the web UIs (also sometimes called the Spark UI or driver UI) of the Spark applications running on your cluster.

### 1. (Optional) Create a Kind cluster with ingress support

Follow [these steps on the Kind docs](https://kind.sigs.k8s.io/docs/user/ingress/) to create a local Kubernetes cluster with ingress support.
This obviously isn't necessary if you already have a cluster to use (e.g. an EKS cluster).

### 2. Install the Spark operator

`spark-values.yaml`:

```yaml
controller:
  uiService:
    enable: true
  uiIngress:
    enable: true
    # Replace with your cluster's ingress URL. This value is intended for working with Kind.
    urlFormat: /{{$appNamespace}}/{{$appName}}
```

```
helm install spark-operator spark-operator \
    --repo https://kubeflow.github.io/spark-operator \
    -n spark-operator --create-namespace \
    -f spark-values.yaml
```

### 3. Install the NGINX ingress controller

If using Kind, follow [their docs](https://kind.sigs.k8s.io/docs/user/ingress/#ingress-nginx) and run this command to install a Kind specific manifest:

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
```

If not using Kind, find your setup on the [installation guide](https://kubernetes.github.io/ingress-nginx/deploy/).

### 4. Create an application

`application.yaml`:

```yaml
apiVersion: sparkoperator.k8s.io/v1beta2
kind: SparkApplication
metadata:
  name: spark-pi
  namespace: default
spec:
  type: Scala
  mode: cluster
  image: spark:3.5.3
  imagePullPolicy: IfNotPresent
  mainClass: org.apache.spark.examples.SparkPi
  mainApplicationFile: local:///opt/spark/examples/jars/spark-examples.jar
  arguments:
    - "100000"
  sparkVersion: 3.5.3
  driver:
    cores: 1
    memory: 512m
    serviceAccount: spark-operator-spark
  executor:
    instances: 1
    cores: 1
    memory: 512m
```

```
kubectl apply -f application.yaml
```

### 5. Access the web UI

After waiting for the application to be submitted by the operator and for the web UI to come up in the driver, you can now access the web UI of the application.
If using Kind, this should be [http://localhost/default/spark-pi](https://localhost:443/default/spark-pi).

![A screenshot of a Spark UI and k9s](/assets/spark-nginx-screenshot.png)
