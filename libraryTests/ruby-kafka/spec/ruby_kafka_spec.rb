require 'kafka'

CMD_TINY_KAFKA = '../../bin/tiny-kafka start'

RSpec.describe('ruby-kafka') do
  before(:all) do
    @pid = Thread.new { system(CMD_TINY_KAFKA) }.tap { |t| t.abort_on_exception = true }
    sleep(1)
  end

  after(:all) do
    Thread.kill(@pid)
  end

  it 'create topic' do
    kafka = Kafka.new(
      ['localhost:9092'],
      client_id: 'tiny-kafka-lib-ruby-kafka'
    )

    kafka.create_topic("topic")
  end

  it 'produce' do
    kafka = Kafka.new(
      ['localhost:9092'],
      client_id: 'tiny-kafka-lib-ruby-kafka'
    )

    producer = kafka.producer
    producer.produce('Hello, World!', key: 'hello', topic: 'kafkajs-topic-name')
    producer.deliver_messages
    producer.shutdown
  end
end
