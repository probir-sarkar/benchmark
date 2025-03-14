import { Worker } from "node:worker_threads";
// ✅ Recursive Fibonacci
function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// ✅ Merge Sort
function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  let result: number[] = [];
  let i = 0,
    j = 0;
  while (i < left.length && j < right.length) {
    result.push(left[i] < right[j] ? left[i++] : right[j++]);
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}

// ✅ Parallel Matrix Multiplication using Web Workers
async function parallelMultiplyMatrices(A: number[][], B: number[][]): Promise<number[][]> {
  const size = A.length;
  const result = Array.from({ length: size }, () => Array(size).fill(0));

  const numWorkers = 4;
  const chunkSize = Math.ceil(size / numWorkers);
  const workers: Worker[] = [];

  for (let i = 0; i < numWorkers; i++) {
    // Use Node.js worker threads with the proper path
    const worker = new Worker("./matrixWorker.js");
    workers.push(worker);
  }

  await Promise.all(
    workers.map(
      (worker, i) =>
        new Promise<void>((resolve) => {
          const start = i * chunkSize;
          const end = Math.min((i + 1) * chunkSize, size);

          worker.postMessage({ A, B, start, end });

          worker.on("message", (data) => {
            const { result: partialResult, start, end } = data;
            for (let i = start; i < end; i++) {
              result[i] = partialResult[i];
            }
            worker.terminate();
            resolve();
          });
        })
    )
  );

  return result;
}

// ✅ Benchmarking Utility
function measureExecutionTime(label: string, fn: () => void) {
  console.time(label);
  fn();
  console.timeEnd(label);
}

// ✅ Benchmark Runner
async function benchmark() {
  console.log("Starting benchmarks...");

  // Fibonacci Benchmark
  measureExecutionTime("Fibonacci Execution Time", () => {
    console.log(`Fibonacci(45):`, fibonacci(45));
  });

  // Merge Sort Benchmark
  measureExecutionTime("Merge Sort Execution Time", () => {
    const arraySize = 5000000;
    const arr = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 1_000_000));
    mergeSort(arr);
  });

  // Matrix Multiplication Benchmark
  const matrixSize = 1000;
  const A = Array.from({ length: matrixSize }, () => Array.from({ length: matrixSize }, () => Math.random() * 10));
  const B = Array.from({ length: matrixSize }, () => Array.from({ length: matrixSize }, () => Math.random() * 10));

  console.time("Matrix Multiplication Execution Time");
  await parallelMultiplyMatrices(A, B);
  console.timeEnd("Matrix Multiplication Execution Time");
}

benchmark();
