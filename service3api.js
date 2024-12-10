const { Kafka } = require("kafkajs");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

// Initialize Kafka instance
const kafka = new Kafka({
  clientId: process.env.GCLIENT,
  brokers: [process.env.BROKER], // Replace with your broker address
});

const producer = kafka.producer();
let messageCount = 0; // To track the number of messages sent

const sendAverageToAPI = async () => {
  const average = messageCount;
  try {
    await axios.post(process.env.URL, {
      service: process.env.GCLIENT,
      average: average,
    });
    console.log(`[${process.env.GCLIENT}] Sent average to API: ${average}`);
  } catch (error) {
    console.error(
      `[${process.env.GCLIENT}] Failed to send average to API: ${error.message}`
    );
  }
};

const run = async () => {
  await producer.connect();

  setInterval(async () => {
    const message = `Message from ${
      process.env.GCLIENT
    } at ${new Date().toISOString()}`;
    await producer.send({
      topic: process.env.TOPIC3,
      messages: [{ value: message }],
    });
    messageCount++;
    console.log(`[${process.env.GCLIENT}] Sent: ${message}`);
  }, 1000); // Send message every 650ms

  // Send the average every 5 seconds
  setInterval(() => {
    sendAverageToAPI();
  }, 5000); // Every 5 seconds
};

run().catch(console.error);
