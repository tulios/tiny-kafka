const { decode: decodeV2 } = require('kafkajs/src/protocol/requests/metadata/v2/response')
const EncodeResponseV2 = require('./index')

describe('Protocol > Responses > Metadata > v2', () => {
  test('encode', async () => {
    const { buffer } = await EncodeResponseV2({
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

    const decoded = await decodeV2(buffer)

    expect(decoded).toEqual({
      brokers: [{ host: '127.0.0.1', nodeId: 0, port: 9092, rack: null }],
      clusterId: null,
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
