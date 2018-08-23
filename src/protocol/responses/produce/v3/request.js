const Decoder = require('kafkajs/src/protocol/decoder')
const RecordBatchDecoder = require('kafkajs/src/protocol/recordBatch/v0/decoder')

/**
 * Produce Request (Version: 3) => transactional_id acks timeout [topic_data]
 *   transactional_id => NULLABLE_STRING
 *   acks => INT16
 *   timeout => INT32
 *   topic_data => topic [data]
 *     topic => STRING
 *     data => partition record_set
 *       partition => INT32
 *       record_set => RECORDS
 */

module.exports = async ({ payload }) => {
  const decoder = new Decoder(payload)
  return {
    transactionalId: decoder.readString(),
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

  decoder.readInt32() // record batch size
  const messages = await RecordBatchDecoder(decoder)
  return { partition, messages }
}
