const apiKeys = require('../apiKeys')
const { UnsupporterAPIError } = require('../../errors')

const responses = {
  [apiKeys.ApiVersions]: require('./apiVersions'),
  [apiKeys.CreateTopics]: require('./createTopics'),
  [apiKeys.Metadata]: require('./metadata'),
  [apiKeys.Produce]: require('./produce'),
}

module.exports = async (store, request) => {
  if (!responses[request.apiKey]) {
    throw new UnsupporterAPIError(request.apiKey)
  }

  const responseBuilder = responses[request.apiKey]()
  const { buffer } = await responseBuilder.encode({
    store,
    apiVersion: request.apiVersion,
    payload: request.payload,
  })

  return buffer
}
