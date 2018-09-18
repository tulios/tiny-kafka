require 'tmpdir'
require 'kafka'

RSpec.describe('ruby-kafka') do
  before(:all) do
    @pidPath = File.join(Dir.tmpdir, 'tiny-kafka-ruby-kafka.pid')
    cmd = "../../bin/tiny-kafka start --pid #{@pidPath}"
    Thread.new { system(cmd) }.tap { |t| t.abort_on_exception = true }
    sleep(1)
  end

  after(:all) do
    Process.kill('SIGINT', File.read(@pidPath).to_i)
  end

  it 'create topic' do
    kafka = Kafka.new(
      ['127.0.0.1:9092'],
      client_id: 'tiny-kafka-lib-ruby-kafka'
    )

    kafka.create_topic("topic")
  end

  it 'produce' do
    kafka = Kafka.new(
      ['127.0.0.1:9092'],
      client_id: 'tiny-kafka-lib-ruby-kafka'
    )

    producer = kafka.producer
    producer.produce('Hello, World!', key: 'hello', topic: 'kafkajs-topic-name')
    producer.deliver_messages
    producer.shutdown
  end
end
