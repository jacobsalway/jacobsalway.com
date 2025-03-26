---
title: Building Spark from source in Docker
date: 2025-03-26
---

I recently needed to build Spark from source and match the existing [`apache/spark` Docker images](https://hub.docker.com/r/apache/spark/) that 
are published from the [`apache/spark-docker` repository](https://github.com/apache/spark-docker). The Dockerfile below is how I decided to do it
after figuring out how Spark's official releases are built, along with some optimisations to speed up the build:

- Shallow clone the repository
- Applying the recommended JVM opts for Maven from [Building Spark](https://spark.apache.org/docs/latest/building-spark.html#setting-up-mavens-memory-usage)
- Using breadth-first dependency resolution
- Compiling projects in parallel
- Using a Buildkit cache mount for `.m2`
- Omitting Mesos, Yarn, R and Thrift server build flags _(Optional)_

Building the image takes about 5 minutes on my M4 Macbook. You could easily adjust this Dockerfile to build with Java 17, apply patches to Spark,
or add your own JARs to the final image.

## `Dockerfile`

```dockerfile
FROM alpine/git AS git

WORKDIR /

RUN git clone https://github.com/apache/spark.git -b v3.5.5 --depth 1

FROM eclipse-temurin:11-focal AS build

COPY --from=git /spark /spark

WORKDIR /spark

ENV MAVEN_OPTS="-Xss64m -Xmx2g -XX:ReservedCodeCacheSize=1g -Daether.dependencyCollector.impl=bf -Dmaven.artifact.threads=16"
ENV MAVEN_ARGS="-B -T 1C -DskipTests"

RUN --mount=type=cache,target=/root/.m2 ./build/mvn clean
RUN --mount=type=cache,target=/root/.m2 ./build/mvn dependency:resolve

# You can get the build flags for a release by running `docker run apache/spark:3.5.5 cat /opt/spark/RELEASE`
# Omitting -Pmesos, -Pyarn, -Psparkr and -Phive-thriftserver
RUN --mount=type=cache,target=/root/.m2 ./dev/make-distribution.sh --tgz -Pkubernetes -Pscala-2.12 -Phadoop-3 -Phive

# https://github.com/apache/spark-docker/blob/master/3.5.5/scala2.12-java11-ubuntu/Dockerfile
FROM eclipse-temurin:11-jre-focal

ARG spark_uid=185

RUN groupadd --system --gid=${spark_uid} spark && \
    useradd --system --uid=${spark_uid} --gid=spark spark

RUN set -ex; \
    apt-get update; \
    apt-get install -y gnupg2 wget bash tini libc6 libpam-modules krb5-user libnss3 procps net-tools gosu libnss-wrapper; \
    mkdir -p /opt/spark; \
    mkdir /opt/spark/python; \
    mkdir -p /opt/spark/examples; \
    mkdir -p /opt/spark/work-dir; \
    chmod g+w /opt/spark/work-dir; \
    touch /opt/spark/RELEASE; \
    chown -R spark:spark /opt/spark; \
    echo "auth required pam_wheel.so use_uid" >> /etc/pam.d/su; \
    rm -rf /var/lib/apt/lists/*

ENV SPARK_TMP=/spark/spark_tmp
RUN mkdir -p $SPARK_TMP

COPY --from=build /spark/spark-3.5.5-bin-3.3.4.tgz $SPARK_TMP/spark.tgz

WORKDIR $SPARK_TMP

RUN set -ex; \
    tar -xf spark.tgz --strip-components=1; \
    chown -R spark:spark .; \
    mv jars /opt/spark/; \
    mv RELEASE /opt/spark/; \
    mv bin /opt/spark/; \
    mv sbin /opt/spark/; \
    mv kubernetes/dockerfiles/spark/decom.sh /opt/; \
    mv examples /opt/spark/; \
    ln -s "$(basename /opt/spark/examples/jars/spark-examples_*.jar)" /opt/spark/examples/jars/spark-examples.jar; \
    mv kubernetes/tests /opt/spark/; \
    mv data /opt/spark/; \
    mv python/pyspark /opt/spark/python/pyspark/; \
    mv python/lib /opt/spark/python/lib/; \
    # -Psparkr is omitted for the build
    # mv R /opt/spark/; \
    chmod a+x /opt/decom.sh; \
    cd ..; \
    rm -rf "$SPARK_TMP";

RUN wget -O /opt/entrypoint.sh https://raw.githubusercontent.com/apache/spark-docker/refs/heads/master/3.5.5/scala2.12-java11-ubuntu/entrypoint.sh
RUN chmod a+x /opt/entrypoint.sh

ENV SPARK_HOME=/opt/spark

WORKDIR /opt/spark/work-dir

USER spark

ENTRYPOINT [ "/opt/entrypoint.sh" ]
```
