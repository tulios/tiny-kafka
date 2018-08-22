const Encoder = require('kafkajs/src/protocol/encoder')

/**
 * Metadata Response (Version: 2) => [brokers] cluster_id controller_id [topic_metadata]
 *   brokers => node_id host port rack
 *     node_id => INT32
 *     host => STRING
 *     port => INT32
 *     rack => NULLABLE_STRING
 *   cluster_id => NULLABLE_STRING
 *   controller_id => INT32
 *   topic_metadata => topic_error_code topic is_internal [partition_metadata]
 *     topic_error_code => INT16
 *     topic => STRING
 *     is_internal => BOOLEAN
 *     partition_metadata => partition_error_code partition_id leader [replicas] [isr]
 *       partition_error_code => INT16
 *       partition_id => INT32
 *       leader => INT32
 *       replicas => INT32
 *       isr => INT32
 */

const byTopic = (a, b) => a.topic.localeCompare(b.topic)

module.exports = async ({ clusterId, broker, topicMetadata }) => {
  return new Encoder()
    .writeArray([encodeBroker(broker)])
    .writeString(clusterId)
    .writeInt32(0)
    .writeArray(topicMetadata.sort(byTopic).map(encodeTopicMetadata))
}

const encodeBroker = ({ host, port }) =>
  new Encoder()
    .writeInt32(0)
    .writeString(host)
    .writeInt32(port)
    .writeString(null)

const encodeTopicMetadata = ({ topic, partitionMetadata }) =>
  new Encoder()
    .writeInt16(0)
    .writeString(topic)
    .writeBoolean(false)
    .writeArray(partitionMetadata.map(encodePartitionMetadata))

const encodePartitionMetadata = ({ partition }) =>
  new Encoder()
    .writeInt16(0)
    .writeInt32(partition)
    .writeInt32(0)
    .writeArray([0])
    .writeArray([0])
