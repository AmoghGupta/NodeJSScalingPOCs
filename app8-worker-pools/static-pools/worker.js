// Access the workerData by requiring it.
const { parentPort, workerData } = require('worker_threads');

// Something you shouldn"t run in main thread
// since it will block.
function sumPrime(start,end) {
    var sum = 0;
    for (var i = start; i <= end; i++) {
      for (var j = 2; j <= i / 2; j++) {
        if (i % j == 0) {
          break
        }
      }
      if (j > i / 2) {
        sum += i
      }      
    }
    console.log(start, end+" Sum: "+sum);
    return sum;
}

// Main thread will pass the data you need
// through this event listener.
parentPort.on('message', (param) => {
  const result = sumPrime(param.start, param.end);

  // Access the workerData.
//   console.log('workerData is', workerData);

  // return the result to main thread.
  parentPort.postMessage(result);
});