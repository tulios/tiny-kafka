const { Metadata: apiKey } = require('../../apiKeys')
const { NAMESPACES } = require('../../../store')
const { UnsupporterAPIVersionError } = require('../../../errors')

const versions = {
  1: require('./v1'),
  2: require('./v2'),
}

const requestDecoders = {
  1: require('./v1/request'),
  2: require('./v2/request'),
}

module.exports = () => ({
  apiKey,
  versions: {
    minVersion: 1,
    maxVersion: 2,
  },
  encode: async ({ store, apiVersion, payload }) => {
    if (!versions[apiVersion]) {
      throw new UnsupporterAPIVersionError(apiKey, apiVersion)
    }

    const broker = store.get(NAMESPACES.BROKER)
    const topicsStore = store.get(NAMESPACES.TOPICS)
    const clusterId = store.get(NAMESPACES.CLUSTER_ID)

    const requestDecoder = requestDecoders[apiVersion]
    const { topics: requestedTopics } = await requestDecoder({ payload })
    const topicMetadata = requestedTopics.map(topic => {
      return topicsStore.has(topic)
        ? topicsStore.get(topic)
        : topicsStore
            .set(topic, {
              topic,
              partitionMetadata: [{ partition: 0 }],
              partitions: [],
            })
            .get(topic)
    })

    return versions[apiVersion]({ clusterId, broker, topicMetadata })
  },
})
