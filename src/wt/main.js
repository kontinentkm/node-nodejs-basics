import { Worker } from "worker_threads";
import os from "os";

const performCalculations = async () => {
  const numCPUs = os.cpus().length;
  const workers = [];
  const results = [];

  for (let i = 0; i < numCPUs; i++) {
    workers.push(
      new Promise((resolve) => {
        const worker = new Worker(new URL("./worker.js", import.meta.url));
        worker.postMessage(10 + i);

        worker.on("message", (message) => {
          resolve(message);
        });

        worker.on("error", () => {
          resolve({ status: "error", data: null });
        });

        worker.on("exit", (code) => {
          if (code !== 0) {
            resolve({ status: "error", data: null });
          }
        });
      })
    );
  }

  for (const worker of workers) {
    results.push(await worker);
  }

  console.log(results);

  process.exit(0);
};

await performCalculations();