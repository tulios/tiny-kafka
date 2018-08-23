const { decode: decodeV0 } = require('kafkajs/src/protocol/requests/createTopics/v0/response')
const EncodeResponseV0 = require('./index')

describe('Protocol > Responses > CreateTopics > v0', () => {
  test('encode', async () => {
    const { buffer } = await EncodeResponseV0({
      topics: ['topic-1'],
    })

    const decoded = await decodeV0(buffer)

    expect(decoded).toEqual({
      topicErrors: [
        {
          topic: 'topic-1',
          errorCode: 0,
        },
      ],
    })
  })
})
