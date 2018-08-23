const { decode: decodeV1 } = require('kafkajs/src/protocol/requests/metadata/v1/response')
const EncodeResponseV1 = require('./index')

describe('Protocol > Responses > Metadata > v1', () => {
  test('encode', async () => {
    const { buffer } = await EncodeResponseV1({
      broker: {
        host: '127.0.0.1',
        port: '9092',
      },
      topicMetadata: [
        {
          topic: 'topic-1',
          partitionMetadata: [{ partition: 0 }, { partition: 1 }],
        },
        {
          topic: 'topic-2',
          partitionMetadata: [{ partition: 0 }, { partition: 1 }, { partition: 2 }],
        },
      ],
    })

    const decoded = await decodeV1(buffer)

    expect(decoded).toEqual({
      brokers: [{ host: '127.0.0.1', nodeId: 0, port: 9092, rack: null }],
      controllerId: 0,
      topicMetadata: [
        {
          topicErrorCode: 0,
          topic: 'topic-1',
          isInternal: false,
          partitionMetadata: [
            { isr: [0], leader: 0, partitionErrorCode: 0, partitionId: 0, replicas: [0] },
            { isr: [0], leader: 0, partitionErrorCode: 0, partitionId: 1, replicas: [0] },
          ],
        },
        {
          topicErrorCode: 0,
          topic: 'topic-2',
          isInternal: false,
          partitionMetadata: [
            { isr: [0], leader: 0, partitionErrorCode: 0, partitionId: 0, replicas: [0] },
            { isr: [0], leader: 0, partitionErrorCode: 0, partitionId: 1, replicas: [0] },
            { isr: [0], leader: 0, partitionErrorCode: 0, partitionId: 2, replicas: [0] },
          ],
        },
      ],
    })
  })
})
