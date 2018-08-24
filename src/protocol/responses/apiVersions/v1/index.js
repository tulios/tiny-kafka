const path = require('path')
const glob = require('glob')
const Encoder = require('kafkajs/src/protocol/encoder')

const byApiKey = (a, b) => a.apiKey - b.apiKey
let availableApis

/**
 * ApiVersions Response (Version: 1) => error_code [api_versions] throttle_time_ms
 *   error_code => INT16
 *   api_versions => api_key min_version max_version
 *     api_key => INT16
 *     min_version => INT16
 *     max_version => INT16
 *   throttle_time_ms => INT32
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
    .writeInt32(0)
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
