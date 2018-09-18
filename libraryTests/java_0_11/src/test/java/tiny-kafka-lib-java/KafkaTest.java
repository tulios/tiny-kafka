package tiny.kafka.lib.java;

import java.util.Properties;
import java.util.HashMap;
import java.util.Arrays;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.NewTopic;

public class KafkaTest {

  @Test
  @DisplayName("Create topic 0.11.0.2")
  public void createTopic() throws Exception {
    Process process = Runtime.getRuntime().exec("../../bin/tiny-kafka start");
    Thread.sleep(1000);

    Properties config = new Properties();
    config.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, "127.0.0.1:9092");

    try {
      AdminClient admin = AdminClient.create(config);

      Map<String, String> configs = new HashMap<>();
      short partitions = 1;
      short replication = 1;

      admin.createTopics(Arrays.asList(new NewTopic("topic", partitions, replication).configs(configs)));
    } finally {
      process.destroy();
    }
  }

  @Test
  @DisplayName("Producer client 0.11.0.2")
  public void producer() throws Exception {
    Process process = Runtime.getRuntime().exec("../../bin/tiny-kafka start");
    Thread.sleep(1000);

    Properties props = new Properties();
    props.put("bootstrap.servers", "127.0.0.1:9092");
    props.put("acks", "all");
    props.put("retries", 0);
    props.put("batch.size", 16384);
    props.put("linger.ms", 1);
    props.put("buffer.memory", 33554432);
    props.put("request.timeout.ms", 1000);
    props.put("max.block.ms", 1000);
    props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
    props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

    try {
      Producer<String, String> producer = new KafkaProducer<>(props);
      ProducerRecord<String, String> record = new ProducerRecord<>(
        "java-new-topic-name",
        "java-key",
        "java-value"
      );

      producer.send(record).get();
      producer.flush();
      producer.close();
    } finally {
      process.destroy();
    }
  }

}
