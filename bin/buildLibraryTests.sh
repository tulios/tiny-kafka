#!/bin/bash -ex

LIBRARY="$1"

build_kafkajs() {
  docker build -t tiny-kafka-lib-kafkajs -f libraryTests/kafkajs/Dockerfile .
}

build_ruby_kafka() {
  docker build -t tiny-kafka-lib-ruby-kafka -f libraryTests/ruby-kafka/Dockerfile .
}

case ${LIBRARY} in
  kafkajs)
    build_kafkajs
    ;;
  ruby_kafka)
    build_ruby_kafka
    ;;
  *)
    echo -e "Running for all libraries (kafkajs, ruby_kafka)"
    build_kafkajs
    build_ruby_kafka
esac
