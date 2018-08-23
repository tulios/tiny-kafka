#!/bin/bash -ex

LIBRARY="$1"

build_kafkajs() {
  docker build -t tiny-kafka-lib-kafkajs -f libraryTests/kafkajs/Dockerfile .
}
case ${LIBRARY} in
  kafkajs)
    build_kafkajs
    ;;
  *)
    echo -e "Running for all libraries (kafkajs, ruby_kafka)"
    build_kafkajs
esac
