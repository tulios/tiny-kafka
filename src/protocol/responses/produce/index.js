const { Produce: apiKey } = require('../../apiKeys')
const { NAMESPACES } = require('../../../store')

const versions = {
  2: require('./v2'),
}

const requestDecoders = {
  2: require('./v2/request'),
}

module.exports = () => ({
  apiKey,
  versions: {
    minVersion: 2,
    maxVersion: 2,
  },
  encode: async ({ store, apiVersion, payload }) => {
    const topicsStore = store.get(NAMESPACES.TOPICS)

    const requestDecoder = requestDecoders[apiVersion]
    const { topicData } = await requestDecoder({ payload })
    const topicsResponse = {}

    for (let { topic, partitions } of topicData) {
      const topicStore = topicsStore.get(topic)

      for (let { partition, messages } of partitions) {
        const currentMessages = topicStore.partitions[partition] || []
        const storedMessages = [...currentMessages, ...messages]

        topicStore.partitions = { ...topicStore.partitions, [partition]: storedMessages }

        topicsResponse[topic] = topicsResponse[topic] || {}
        topicsResponse[topic][partition] = currentMessages.length // send back the current offset
      }
    }

    return versions[apiVersion]({ topics: topicsResponse })
  },
})