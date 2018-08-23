const { decode: decodeV1 } = require('kafkajs/src/protocol/requests/createTopics/v1/response')
const EncodeResponseV1 = require('./index')

describe('Protocol > Responses > CreateTopics > v1', () => {
  test('encode', async () => {
    const { buffer } = await EncodeResponseV1({
      topics: ['topic-1'],
    })

    const decoded = await decodeV1(buffer)

    expect(decoded).toEqual({
      topicErrors: [
        {
          topic: 'topic-1',
          errorCode: 0,
          errorMessage: null,
        },
      ],
    })
  })
})
