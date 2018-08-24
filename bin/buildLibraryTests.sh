#!/bin/bash -ex

LIBRARY="$1"

build_kafkajs() {
  docker build -t tiny-kafka-lib-kafkajs -f libraryTests/kafkajs/Dockerfile .
}

build_ruby_kafka() {
  docker build -t tiny-kafka-lib-ruby-kafka -f libraryTests/ruby-kafka/Dockerfile .
}

build_java_0_11() {
  docker build -t tiny-kafka-lib-java-0-11 -f libraryTests/java_0_11/Dockerfile .
}

case ${LIBRARY} in
  kafkajs)
    build_kafkajs
    ;;
  ruby_kafka)
    build_ruby_kafka
    ;;
  java_0_11)
    build_java_0_11
    ;;
  *)
    echo -e "Running for all libraries (kafkajs, ruby_kafka, java_0_11)"
    build_kafkajs
    build_ruby_kafka
esac
