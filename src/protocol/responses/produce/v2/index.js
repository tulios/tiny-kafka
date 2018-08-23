const Encoder = require('kafkajs/src/protocol/encoder')

/**
 * v2 (supported in 0.10.0 or later)
 * ProduceResponse => [TopicName [Partition ErrorCode Offset Timestamp]] ThrottleTime
 *   TopicName => string
 *   Partition => int32
 *   ErrorCode => int16
 *   Offset => int64
 *   Timestamp => int64
 *   ThrottleTime => int32
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
