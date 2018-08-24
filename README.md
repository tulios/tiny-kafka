# TinyKafka

[![Build Status](https://travis-ci.org/tulios/tiny-kafka.svg?branch=master)](https://travis-ci.org/tulios/tiny-kafka)

TinyKafka is a tiny implementation of Apache Kafka, targeting your test environments. Powered by [KafkaJS](https://github.com/tulios/kafkajs).

> If it looks like Kafka and quacks like a Kafka, then it probably is Kafka

__Still in development__

When writing tests for your consumers and producers, the primary concern is to exercise your code. You expect Kafka to fulfill its promises, so your tests are not interested in what is happening on the server side. The solution usually falls into three categories: Mocks, running Kafka on your local machine or containerized. These solutions work great but often introduce flakiness or slow down your tests.

_Will TinyKafka work with client X?_

Yes. Very likely. TinyKafka speaks the same protocol of Apache Kafka, but libraries usually have different expectations, for example, the [ruby-kafka](https://github.com/zendesk/ruby-kafka) library doesn't use the API versions request to detect what's supported by the server, it assumes that the server is compatible to Kafka 0.11. TinyKafka works with ruby-kafka but it might not implement all versions available, thus not fulfilling all requirements of all libraries.

_It doesn't work with my Java client version X_

The Java clients have different expectations of which versions the server supports. It uses the API versions request to detect what's supported, but newer versions might assume that you are running latest versions of Kafka. This might not be an issue in the future as KafkaJS and TinyKafka will evolve to support more versions.

_This project is in node.js, but I use language/technology X?_

The goal of this project is to provide an easy to use test server for Kafka. Node.js will have the benefit of having this project as a development dependency, but TinyKafka will publish a tiny binary to facilitate the integration with any technology. Soon more examples on how to use it with your favorite technology.
