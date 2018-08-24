const { decode: decodeV0 } = require('kafkajs/src/protocol/requests/apiVersions/v0/response')
const EncodeResponseV0 = require('./index')

describe('Protocol > Responses > ApiVersions > v0', () => {
  test('encode', async () => {
    const { buffer } = await EncodeResponseV0()
    const decoded = await decodeV0(buffer)

    expect(decoded).toEqual({
      apiVersions: [
        { apiKey: 0, maxVersion: 3, minVersion: 2 },
        { apiKey: 3, maxVersion: 2, minVersion: 1 },
        { apiKey: 18, maxVersion: 2, minVersion: 0 },
        { apiKey: 19, maxVersion: 1, minVersion: 0 },
      ],
      errorCode: 0,
    })
  })
})
