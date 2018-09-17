const path = require('path')
const glob = require('glob')
const Encoder = require('kafkajs/src/protocol/encoder')

const byApiKey = (a, b) => a.apiKey - b.apiKey
let availableApis

try {
  availableApis = require('../../../availableApis.json')
} catch (e) {}

/**
 * ApiVersionResponse => ApiVersions
 *   ErrorCode = INT16
 *   ApiVersions = [ApiVersion]
 *     ApiVersion = ApiKey MinVersion MaxVersion
 *       ApiKey = INT16
 *       MinVersion = INT16
 *       MaxVersion = INT16
 */

module.exports = async () => {
  if (!availableApis) {
    availableApis = {
      errorCode: 0,
      apiVersions: scanAvailableApis().sort(byApiKey),
    }
  }

  return new Encoder()
    .writeInt16(availableApis.errorCode)
    .writeArray(availableApis.apiVersions.map(encoderVersion), 'object')
}

const encoderVersion = version =>
  new Encoder()
    .writeInt16(version.apiKey)
    .writeInt16(version.minVersion)
    .writeInt16(version.maxVersion)

const scanAvailableApis = () =>
  glob
    .sync(path.join(__dirname, '../../*/index.js'))
    .map(path => require(path)())
    .map(entry => ({ apiKey: entry.apiKey, ...entry.versions }))
