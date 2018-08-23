const { ApiVersions: apiKey } = require('../../apiKeys')

const versions = {
  0: require('./v0'),
}

module.exports = () => ({
  apiKey,
  versions: {
    minVersion: 0,
    maxVersion: 0,
  },
  encode: async ({ store, apiVersion, payload }) => versions[apiVersion]({ payload }),
})
