const { CreateTopics: apiKey } = require('../../apiKeys')
const { NAMESPACES } = require('../../../store')

const versions = {
  1: require('./v1'),
}

const requestDecoders = {
  1: require('./v1/request'),
}

module.exports = () => ({
  apiKey,
  versions: {
    minVersion: 1,
    maxVersion: 1,
  },
  encode: async ({ store, apiVersion, payload }) => {
    const topicsStore = store.get(NAMESPACES.TOPICS)
    const requestDecoder = requestDecoders[apiVersion]
    const { topics: requestedTopics } = await requestDecoder({ payload })

    for (let { topic } of requestedTopics) {
      topicsStore.set(topic, {
        topic,
        partitionMetadata: [{ partition: 0 }],
        partitions: [],
      })
    }

    return versions[apiVersion]({ topics: requestedTopics.map(({ topic }) => topic) })
  },
})
