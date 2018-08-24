#!/bin/bash -ex

LIBRARY="$1"

run_kafkajs() {
  docker run -it tiny-kafka-lib-kafkajs
}

run_ruby_kafka() {
  docker run -it tiny-kafka-lib-ruby-kafka
}

run_java_0_11() {
  docker run -it tiny-kafka-lib-java-0-11
}

case ${LIBRARY} in
  kafkajs)
    run_kafkajs
    ;;
  ruby_kafka)
    run_ruby_kafka
    ;;
  java_0_11)
    run_java_0_11
    ;;
  *)
    echo -e "Running for all libraries (kafkajs, ruby_kafka, java_0_11)"
    run_kafkajs
    run_ruby_kafka
esac
