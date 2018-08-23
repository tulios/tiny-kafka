const Encoder = require('kafkajs/src/protocol/encoder')

/**
 * Produce Response (Version: 3) => [responses] throttle_time_ms
 *   responses => topic [partition_responses]
 *     topic => STRING
 *     partition_responses => partition error_code base_offset log_append_time
 *       partition => INT32
 *       error_code => INT16
 *       base_offset => INT64
 *       log_append_time => INT64
 *   throttle_time_ms => INT32
 */

// {
//   <TopicName>: {
//     <Partition>: <Offset>
//   },
// }
module.exports = async ({ topics }) => {
  const topicNames = Object.keys(topics)
  return new Encoder().writeArray(topicNames.map(encodeTopic(topics))).writeInt32(0)
}

const encodeTopic = topics => topicName => {
  const partitions = Object.keys(topics[topicName])
  return new Encoder()
    .writeString(topicName)
    .writeArray(partitions.map(encodePartitions(topics[topicName])))
}

const encodePartitions = topic => partition =>
  new Encoder()
    .writeInt32(partition)
    .writeInt16(0)
    .writeInt64(topic[partition])
    .writeInt64(-1)
