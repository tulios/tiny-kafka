const { decode: decodeV0 } = require('kafkajs/src/protocol/requests/apiVersions/v0/response')
const EncodeResponseV0 = require('./index')

describe('Protocol > Responses > ApiVersions > v0', () => {
  test('encode', async () => {
    const { buffer } = await EncodeResponseV0()
    const decoded = await decodeV0(buffer)

    expect(decoded).toEqual({
      errorCode: 0,
      apiVersions: [
        {
          apiKey: 3,
          maxVersion: 2,
          minVersion: 2,
        },
        {
          apiKey: 18,
          maxVersion: 0,
          minVersion: 0,
        },
      ],
    })
  })
})
