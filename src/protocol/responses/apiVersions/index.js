const { ApiVersions: apiKey } = require('../../apiKeys')
const { UnsupporterAPIVersionError } = require('../../../errors')

const versions = {
  0: require('./v0'),
  1: require('./v1'),
  2: require('./v2'),
}

module.exports = () => ({
  apiKey,
  versions: {
    minVersion: 0,
    maxVersion: 2,
  },
  encode: async ({ store, apiVersion, payload }) => {
    if (!versions[apiVersion]) {
      throw new UnsupporterAPIVersionError(apiKey, apiVersion)
    }

    return versions[apiVersion]({ payload })
  },
})
