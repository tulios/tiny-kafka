const EncodeProduceRequestV3 = require('kafkajs/src/protocol/requests/produce/v3/request')
const DecodeRequestV3 = require('./request')

describe('Protocol > Responses > Produce > v3 > request', () => {
  test('decode', async () => {
    const requestData = {
      acks: -1,
      timeout: 30000,
      topicData: [
        {
          topic: 'test-topic-9f825c3f60bb0b4db583',
          partitions: [
            {
              partition: 0,
              messages: [
                {
                  key: 'key-bb252ae5801883c12bbd',
                  value: 'some-value-10340c6329f8bbf5b4a2',
                  timestamp: 1509819296569,
                },
                {
                  key: 'key-8a14e73a88e93f7c3a39',
                  value: 'some-value-4fa91513bffbcc0e34b3',
                  timestamp: 1509819296569,
                },
                {
                  key: 'key-183a2d8eb3683f080b82',
                  value: 'some-value-938afcf1f2ef0439c752',
                  timestamp: 1509819296569,
                },
              ],
            },
          ],
        },
      ],
    }

    const { buffer: payload } = await EncodeProduceRequestV3(requestData).encode()
    await expect(DecodeRequestV3({ payload })).resolves.toEqual({
      transactionalId: null,
      acks: -1,
      timeout: 30000,
      topicData: [
        {
          topic: 'test-topic-9f825c3f60bb0b4db583',
          partitions: [
            {
              partition: 0,
              messages: {
                firstOffset: '0',
                firstSequence: 0,
                firstTimestamp: '1509819296569',
                inTransaction: false,
                isControlBatch: false,
                lastOffsetDelta: 2,
                maxTimestamp: '1509819296569',
                partitionLeaderEpoch: 0,
                producerEpoch: 0,
                producerId: '-1',
                records: [
                  {
                    attributes: 0,
                    headers: {},
                    magicByte: 2,
                    offset: '0',
                    key: Buffer.from('key-bb252ae5801883c12bbd'),
                    value: Buffer.from('some-value-10340c6329f8bbf5b4a2'),
                    timestamp: '1509819296569',
                  },
                  {
                    attributes: 0,
                    headers: {},
                    magicByte: 2,
                    offset: '1',
                    key: Buffer.from('key-8a14e73a88e93f7c3a39'),
                    value: Buffer.from('some-value-4fa91513bffbcc0e34b3'),
                    timestamp: '1509819296569',
                  },
                  {
                    attributes: 0,
                    headers: {},
                    magicByte: 2,
                    offset: '2',
                    key: Buffer.from('key-183a2d8eb3683f080b82'),
                    value: Buffer.from('some-value-938afcf1f2ef0439c752'),
                    timestamp: '1509819296569',
                  },
                ],
              },
            },
          ],
        },
      ],
    })
  })
})
