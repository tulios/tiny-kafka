const EncodeProduceRequestV2 = require('kafkajs/src/protocol/requests/produce/v2/request')
const DecodeRequestV2 = require('./request')

describe('Protocol > Responses > Produce > v2 > request', () => {
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

    const { buffer: payload } = await EncodeProduceRequestV2(requestData).encode()
    await expect(DecodeRequestV2({ payload })).resolves.toEqual({
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
                  attributes: 0,
                  crc: -236249870,
                  magicByte: 1,
                  offset: '-1',
                  size: 77,
                  key: Buffer.from('key-bb252ae5801883c12bbd'),
                  value: Buffer.from('some-value-10340c6329f8bbf5b4a2'),
                  timestamp: '1509819296569',
                },
                {
                  attributes: 0,
                  crc: -1193765698,
                  magicByte: 1,
                  offset: '-1',
                  size: 77,
                  key: Buffer.from('key-8a14e73a88e93f7c3a39'),
                  value: Buffer.from('some-value-4fa91513bffbcc0e34b3'),
                  timestamp: '1509819296569',
                },
                {
                  attributes: 0,
                  crc: -1405299244,
                  magicByte: 1,
                  offset: '-1',
                  size: 77,
                  key: Buffer.from('key-183a2d8eb3683f080b82'),
                  value: Buffer.from('some-value-938afcf1f2ef0439c752'),
                  timestamp: '1509819296569',
                },
              ],
            },
          ],
        },
      ],
    })
  })
})
