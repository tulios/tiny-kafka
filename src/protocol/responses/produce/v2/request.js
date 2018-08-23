const Decoder = require('kafkajs/src/protocol/decoder')
const MessageSetDecoder = require('kafkajs/src/protocol/messageSet/decoder')

/**
 * Produce Request (Version: 0) => acks timeout [topic_data]
 *   acks => INT16
 *   timeout => INT32
 *   topic_data => topic [data]
 *     topic => STRING
 *     data => partition record_set record_set_size
 *       partition => INT32
 *       record_set_size => INT32
 *       record_set => RECORDS
 */

module.exports = async ({ payload }) => {
  const decoder = new Decoder(payload)
  return {
    acks: decoder.readInt16(),
    timeout: decoder.readInt32(),
    topicData: await decoder.readArrayAsync(decoderTopic),
  }
}

const decoderTopic = async decoder => ({
  topic: decoder.readString(),
  partitions: await decoder.readArrayAsync(decodeData),
})

const decodeData = async decoder => {
  const partition = decoder.readInt32()
  const messages = await MessageSetDecoder(decoder)
  return { partition, messages }
}
