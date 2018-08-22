const Decoder = require('kafkajs/src/protocol/decoder')

const INT32_SIZE = Decoder.int32Size()
const INT16_SIZE = INT32_SIZE / 2

module.exports = async buffer => {
  const decoder = new Decoder(buffer)
  const apiKey = decoder.readInt16()
  const apiVersion = decoder.readInt16()
  const correlationId = decoder.readInt32()
  const clientId = decoder.readString()

  const currentSize = Buffer.byteLength(decoder.buffer)
  const remainingBytes = currentSize - decoder.offset
  const payload = remainingBytes > 0 ? decoder.readAll() : Buffer.alloc(0)

  return {
    apiKey,
    apiVersion,
    correlationId,
    clientId,
    payload,
  }
}
