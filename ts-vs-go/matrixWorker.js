import { parentPort } from "node:worker_threads";

parentPort.on("message", (data) => {
  const { A, B, start, end } = data;
  const size = A.length;
  const result = Array.from({ length: size }, () => Array(size).fill(0));

  // Perform matrix multiplication for assigned rows
  for (let i = start; i < end; i++) {
    for (let j = 0; j < size; j++) {
      for (let k = 0; k < size; k++) {
        result[i][j] += A[i][k] * B[k][j];
      }
    }
  }

  parentPort.postMessage({ result, start, end });
});
