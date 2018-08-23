#!/bin/bash -ex

LIBRARY="$1"

run_kafkajs() {
  docker run -it tiny-kafka-lib-kafkajs
}


case ${LIBRARY} in
  kafkajs)
    run_kafkajs
    ;;
  *)
    echo -e "Running for all libraries (kafkajs, ruby_kafka)"
    run_kafkajs
esac
