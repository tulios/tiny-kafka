const Encoder = require('kafkajs/src/protocol/encoder')

/**
 * CreateTopics Response (Version: 0) => [topic_errors]
 *   topic_errors => topic error_code
 *     topic => STRING
 *     error_code => INT16
 */

module.exports = async ({ topics }) => {
  return new Encoder().writeArray(
    topics.map(topic => new Encoder().writeString(topic).writeInt16(0))
  )
}
