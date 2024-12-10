# Apache Kafka Multithreading Architecture in Node.js

## Project Overview

1. **Producers**:
   - Two producers (Client 1A and Client 1B) generate data every **1 second** to a shared Kafka topic.
   - A third producer (Client 2) generates data every **650ms** to a separate Kafka topic.

2. **Consumers**:
   - **Consumer 1**: Consumes data from Client 1A and Client 1B, processes the data using multithreading (Node.js worker threads), and prints the results.
   - **Consumer 2**: Consumes data from Client 2 and prints the received messages.

3. **API Integration**:
   - Client 2 sends the average number of messages it has sent to an external API every **5 seconds**.

## Technologies Used

- **Apache Kafka**: Message broker for inter-service communication.
- **Node.js**: Runtime environment for building the services.
- **Worker Threads**: Node.js multithreading for parallel processing.
- **Axios**: HTTP client for API integration.

