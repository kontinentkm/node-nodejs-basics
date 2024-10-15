import { parentPort } from 'worker_threads';

const nthFibonacci = (n) => {
    if (n < 2) return n;
    return nthFibonacci(n - 1) + nthFibonacci(n - 2);
};

const sendResult = (n) => {
    try {
        const result = nthFibonacci(n);
        parentPort.postMessage({ status: 'resolved', data: result });
    } catch (error) {
        parentPort.postMessage({ status: 'error', data: null });
        console.error(`Error calculating Fibonacci for ${n}:`, error);
    }
};

parentPort.on('message', (n) => {
    sendResult(n);
});
