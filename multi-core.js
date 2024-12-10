const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");
const os = require("os");

if (isMainThread) {
  // Main thread: Determine the number of CPU cores
  const numCores = os.cpus().length / 2;
  console.log(
    `Main thread detected ${numCores} CPU cores. Spawning ${numCores} workers...`
  );

  for (let i = 1; i <= numCores; i++) {
    const worker = new Worker(__filename, { workerData: { id: i } }); // Pass unique ID to each worker
    worker.on("message", (message) => {
      console.log(`Worker ${message.id}: ${message.message}`);
    });
    worker.on("error", (err) => {
      console.error(`Worker ${i} error:`, err);
    });
    worker.on("exit", (code) => {
      if (code !== 0) {
        console.error(`Worker ${i} stopped with exit code ${code}`);
      }
    });
  }
} else {
  // Worker thread: Perform work and send message
  const { id } = workerData; // Get the unique worker ID
  parentPort.postMessage({
    id,
    message: `Hello from worker ${id} with process ID ${process.pid}!`,
  });
}
