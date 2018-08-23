const { decode: decodeV2 } = require('kafkajs/src/protocol/requests/produce/v2/response')
const EncodeResponseV2 = require('./index')

describe('Protocol > Responses > Produce > v2', () => {
  test('encode', async () => {
    const { buffer } = await EncodeResponseV2({
      topics: {
        'topic-1': { 0: 1000 },
      },
    })

    const decoded = await decodeV2(buffer)

    expect(decoded).toEqual({
      throttleTime: 0,
      topics: [
        {
          topicName: 'topic-1',
          partitions: [{ partition: 0, errorCode: 0, offset: '1000', timestamp: '-1' }],
        },
      ],
    })
  })
})
