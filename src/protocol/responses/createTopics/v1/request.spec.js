const EncodeCreateTopicsRequestV1 = require('kafkajs/src/protocol/requests/createTopics/v1/request')
const DecodeRequestV1 = require('./request')

describe('Protocol > Responses > CreateTopics > v1 > request', () => {
  test('decode', async () => {
    const { buffer: payload } = await EncodeCreateTopicsRequestV1({
      topics: [
        { topic: 'test-topic-c8d8ca3d95495c6b900d' },
        { topic: 'test-topic-050fb2e6aed13a954288' },
      ],
      timeout: 5000,
      validateOnly: true,
    }).encode()

    await expect(DecodeRequestV1({ payload })).resolves.toEqual({
      topics: [
        { topic: 'test-topic-c8d8ca3d95495c6b900d' },
        { topic: 'test-topic-050fb2e6aed13a954288' },
      ],
      timeout: 5000,
      validateOnly: true,
    })
  })
})
