const { Kafka } = require("kafkajs");
const dotenv = require("dotenv");

dotenv.config();

// Initialize Kafka instance
const kafka = new Kafka({
  clientId: process.env.CLIENT,
  brokers: [process.env.BROKER], // Replace with your broker address
});

const producer = kafka.producer();

const run = async () => {
  await producer.connect();

  setInterval(async () => {
    const message = `Message from ${
      process.env.CLIENT
    } 2 at ${new Date().toISOString()}`;
    await producer.send({
      topic: process.env.TOPIC2,
      messages: [{ value: message }],
    });
    console.log(`[${process.env.CLIENT} 2] Sent: ${message}`);
  }, 650); // Send message every 650ms
};

run().catch(console.error);
