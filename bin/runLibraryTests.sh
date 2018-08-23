#!/bin/bash -ex

LIBRARY="$1"

run_kafkajs() {
  docker run -it tiny-kafka-lib-kafkajs
}

run_ruby_kafka() {
  docker run -it tiny-kafka-lib-ruby-kafka
}

case ${LIBRARY} in
  kafkajs)
    run_kafkajs
    ;;
  ruby_kafka)
    run_ruby_kafka
    ;;
  *)
    echo -e "Running for all libraries (kafkajs, ruby_kafka)"
    run_kafkajs
    run_ruby_kafka
esac
