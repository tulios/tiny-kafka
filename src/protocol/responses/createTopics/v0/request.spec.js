const EncodeCreateTopicsRequestV0 = require('kafkajs/src/protocol/requests/createTopics/v0/request')
const DecodeRequestV0 = require('./request')

describe('Protocol > Responses > CreateTopics > v0 > request', () => {
  test('decode', async () => {
    const { buffer: payload } = await EncodeCreateTopicsRequestV0({
      topics: [
        { topic: 'test-topic-c8d8ca3d95495c6b900d' },
        { topic: 'test-topic-050fb2e6aed13a954288' },
      ],
      timeout: 5000,
    }).encode()

    await expect(DecodeRequestV0({ payload })).resolves.toEqual({
      topics: [
        { topic: 'test-topic-c8d8ca3d95495c6b900d' },
        { topic: 'test-topic-050fb2e6aed13a954288' },
      ],
      timeout: 5000,
    })
  })
})
