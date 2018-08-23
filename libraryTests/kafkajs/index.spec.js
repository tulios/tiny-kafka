const { Kafka } = require('kafkajs')
const Server = require('../../src/server')

describe('KafkaJS', () => {
  let server, kafka

  beforeAll(async () => {
    server = new Server()
    kafka = new Kafka({
      clientId: 'tiny-kafka-lib-kafkajs',
      brokers: ['localhost:9092'],
    })

    await server.listen()
  })

  afterAll(async () => {
    await server.close()
  })

  test('admin#createTopics', async () => {
    const admin = kafka.admin()

    try {
      await admin.connect()
      await admin.createTopics({
        topics: [{ topic: 'kafkajs-new-topic-name' }],
      })
    } finally {
      await admin.disconnect()
    }
  })

  test('producer', async () => {
    const topicName = 'kafkajs-topic-name'
    const producer = kafka.producer()

    try {
      await producer.connect()

      const response1 = await producer.send({
        topic: topicName,
        messages: [{ key: 'key1', value: 'hello world' }],
      })

      expect(response1).toEqual([
        {
          topicName,
          errorCode: 0,
          offset: '0',
          partition: 0,
          timestamp: '-1',
        },
      ])

      const response2 = await producer.send({
        topic: 'kafkajs-topic-name',
        messages: [, { key: 'key2', value: 'hey hey!' }],
      })

      expect(response2).toEqual([
        {
          topicName,
          errorCode: 0,
          offset: '1',
          partition: 0,
          timestamp: '-1',
        },
      ])
    } finally {
      await producer.disconnect()
    }
  })
})
