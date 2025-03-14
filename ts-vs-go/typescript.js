var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// ✅ Recursive Fibonacci
function fibonacci(n) {
    if (n <= 1)
        return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
// ✅ Merge Sort
function mergeSort(arr) {
    if (arr.length <= 1)
        return arr;
    var mid = Math.floor(arr.length / 2);
    var left = mergeSort(arr.slice(0, mid));
    var right = mergeSort(arr.slice(mid));
    return merge(left, right);
}
function merge(left, right) {
    var result = [];
    var i = 0, j = 0;
    while (i < left.length && j < right.length) {
        result.push(left[i] < right[j] ? left[i++] : right[j++]);
    }
    return __spreadArray(__spreadArray(__spreadArray([], result, true), left.slice(i), true), right.slice(j), true);
}
// ✅ Parallel Matrix Multiplication using Web Workers
function parallelMultiplyMatrices(A, B) {
    return __awaiter(this, void 0, void 0, function () {
        var size, result, numWorkers, chunkSize, workers, i, worker;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    size = A.length;
                    result = Array.from({ length: size }, function () { return Array(size).fill(0); });
                    numWorkers = 4;
                    chunkSize = Math.ceil(size / numWorkers);
                    workers = [];
                    for (i = 0; i < numWorkers; i++) {
                        worker = new Worker("matrixWorker.js");
                        workers.push(worker);
                    }
                    return [4 /*yield*/, Promise.all(workers.map(function (worker, i) {
                            return new Promise(function (resolve) {
                                var start = i * chunkSize;
                                var end = Math.min((i + 1) * chunkSize, size);
                                worker.postMessage({ A: A, B: B, start: start, end: end });
                                worker.onmessage = function (event) {
                                    var _a = event.data, partialResult = _a.result, start = _a.start, end = _a.end;
                                    for (var i_1 = start; i_1 < end; i_1++) {
                                        result[i_1] = partialResult[i_1];
                                    }
                                    worker.terminate();
                                    resolve();
                                };
                            });
                        }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
// ✅ Benchmarking Utility
function measureExecutionTime(label, fn) {
    console.time(label);
    fn();
    console.timeEnd(label);
}
// ✅ Benchmark Runner
function benchmark() {
    return __awaiter(this, void 0, void 0, function () {
        var matrixSize, A, B;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Starting benchmarks...");
                    // Fibonacci Benchmark
                    measureExecutionTime("Fibonacci Execution Time", function () {
                        console.log("Fibonacci(45):", fibonacci(45));
                    });
                    // Merge Sort Benchmark
                    measureExecutionTime("Merge Sort Execution Time", function () {
                        var arraySize = 5000000;
                        var arr = Array.from({ length: arraySize }, function () { return Math.floor(Math.random() * 1000000); });
                        mergeSort(arr);
                    });
                    matrixSize = 1000;
                    A = Array.from({ length: matrixSize }, function () { return Array.from({ length: matrixSize }, function () { return Math.random() * 10; }); });
                    B = Array.from({ length: matrixSize }, function () { return Array.from({ length: matrixSize }, function () { return Math.random() * 10; }); });
                    console.time("Matrix Multiplication Execution Time");
                    return [4 /*yield*/, parallelMultiplyMatrices(A, B)];
                case 1:
                    _a.sent();
                    console.timeEnd("Matrix Multiplication Execution Time");
                    return [2 /*return*/];
            }
        });
    });
}
benchmark();
