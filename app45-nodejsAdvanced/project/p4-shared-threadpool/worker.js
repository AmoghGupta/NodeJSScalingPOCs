// Access the workerData by requiring it.
const { parentPort, workerData , threadId } = require('worker_threads');

function fiboSum(n){
  if (n <= 1)
        return n;
  return fiboSum(n-1) + fiboSum(n-2);
}

// Main thread will pass the data you need
// through this event listener.
parentPort.on('message', (param) => {
  console.log("message received on thread "+threadId);
  if (typeof param !== 'number') {
    throw new Error('param must be a number.');
  }
  const result = fiboSum(param);
  
  // return the result to main thread.
  parentPort.postMessage(result);
});
