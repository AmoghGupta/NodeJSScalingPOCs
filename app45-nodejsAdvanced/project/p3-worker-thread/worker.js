// Worker thread
const { workerData, parentPort }  = require('worker_threads');

// some CPU intensive task
function doWork(duration){
    console.log("Worker executing");
    const start = Date.now();
    while(Date.now() - start < duration){};
    console.log("CPU intensive work completed in worker");
    // once task completed send the data to main thread
    parentPort.postMessage({ fileName: workerData, status: 'Done' });
}


// run this cpu intensive task
doWork(3000);


