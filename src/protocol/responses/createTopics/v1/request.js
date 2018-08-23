const Decoder = require('kafkajs/src/protocol/decoder')

/**
 * CreateTopics Request (Version: 1) => [create_topic_requests] timeout validate_only
 *   create_topic_requests => topic num_partitions replication_factor [replica_assignment] [config_entries]
 *     topic => STRING
 *     num_partitions => INT32
 *     replication_factor => INT16
 *     replica_assignment => partition [replicas]
 *       partition => INT32
 *       replicas => INT32
 *     config_entries => config_name config_value
 *       config_name => STRING
 *       config_value => NULLABLE_STRING
 *   timeout => INT32
 *   validate_only => BOOLEAN
 */

module.exports = async ({ payload }) => {
  const decoder = new Decoder(payload)
  return {
    topics: decoder.readArray(decodeTopic),
    timeout: decoder.readInt32(),
    validateOnly: decoder.readBoolean(),
  }
}

const decodeTopic = decoder => {
  const { topic } = {
    topic: decoder.readString(),
    numPartitions: decoder.readInt32(),
    replicationFactor: decoder.readInt16(),
    replicaAssignment: decoder.readArray(decodeReplicaAssignment),
    configEntries: decoder.readArray(decodeConfigEntries),
  }

  return { topic }
}

const decodeReplicaAssignment = decoder => ({
  partition: decoder.readInt32(),
  replicas: decoder.readArray(d => d.readInt32()),
})

const decodeConfigEntries = decoder => ({
  name: decoder.readString(),
  value: decoder.readString(),
})
