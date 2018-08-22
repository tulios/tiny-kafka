const apiKeys = require('../apiKeys')

const responses = {
  [apiKeys.ApiVersions]: require('./ApiVersions'),
  [apiKeys.Metadata]: require('./Metadata'),
}

module.exports = async (store, request) => {
  const responseBuilder = responses[request.apiKey]()
  const { buffer } = await responseBuilder.encode({
    store,
    apiVersion: request.apiVersion,
    payload: request.payload,
  })

  return buffer
}
