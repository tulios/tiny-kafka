const { decode: decodeV3 } = require('kafkajs/src/protocol/requests/produce/v3/response')
const EncodeResponseV3 = require('./index')

describe('Protocol > Responses > Produce > v3', () => {
  test('encode', async () => {
    const { buffer } = await EncodeResponseV3({
      topics: {
        'topic-1': { 0: 1000 },
      },
    })

    const decoded = await decodeV3(buffer)

    expect(decoded).toEqual({
      throttleTime: 0,
      topics: [
        {
          topicName: 'topic-1',
          partitions: [{ partition: 0, errorCode: 0, baseOffset: '1000', logAppendTime: '-1' }],
        },
      ],
    })
  })
})
