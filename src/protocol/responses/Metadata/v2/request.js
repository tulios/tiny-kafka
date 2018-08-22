const Decoder = require('kafkajs/src/protocol/decoder')

/**
 * Metadata Request (Version: 0) => [topics]
 *   topics => STRING
 */

module.exports = async ({ payload }) => {
  const decoder = new Decoder(payload)
  return {
    topics: decoder.readArray(d => d.readString()),
  }
}
