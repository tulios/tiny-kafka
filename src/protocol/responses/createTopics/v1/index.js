const Encoder = require('kafkajs/src/protocol/encoder')

/**
 * CreateTopics Response (Version: 1) => [topic_errors]
 *   topic_errors => topic error_code error_message
 *     topic => STRING
 *     error_code => INT16
 *     error_message => NULLABLE_STRING
 */

module.exports = async ({ topics }) => {
  return new Encoder().writeArray(
    topics.map(topic =>
      new Encoder()
        .writeString(topic)
        .writeInt16(0)
        .writeString(null)
    )
  )
}
