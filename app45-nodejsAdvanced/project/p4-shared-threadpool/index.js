// As the documentation says:

// When we have only a single worker, the application has to wait until the worker is freed to accept a new task. 
// It delays the application’s response time to other queued requests.
// We can avoid this by using a pool of threads.
const { Worker} = require('worker_threads');
const express = require('express');
const app = express();
const crypto = require('crypto');
const {StaticPool} = require("node-worker-threads-pool");

const workerData = "Web workers node js";
//Create a static worker pool with 8 workers


// Scenario 1 => we use one thread to do our work, it takes more time
// const pool = new StaticPool({
//     size: 1,
//     task: "./worker.js",
//     workerData:workerData
// });

// Scenario 2 ==> we increased the number of threads in pool and divided the work into chunks
// hence processing became faster
const pool = new StaticPool({
    size: 4,
    task: "./worker.js",
    workerData:workerData
});

// we use webworkers to get a cpu intensive task done quickly
// not to assign one worker for each request
app.get('/r1', (req,res)=>{
    console.log("Received request r1");
    (async()=>{
    let start = Date.now();
    
    // Scenario 1
    // const result = await Promise.all([pool.exec(45)]);
    // console.log("Time taken: ", (Date.now()-start)/1000 +'s');
    // console.log("Result ", result);
    // res.send((result).toString());
    
    // OUTPUT
    // Time taken:  11.297s
    // Result  [ 1134903170 ]
    
    // Scenario 2
    // we have 5 threads in pool but we are consuming only 2 here for 1 request
    const result = await Promise.all([pool.exec(43),pool.exec(44)]);
    console.log("Time taken: ", (Date.now()-start)/1000 +'s');
    console.log("Result ", (result[0]+result[1]).toString());
    res.send((result[0]+result[1]).toString());

    //OUTPUT
    // Time taken:  7.092s
    // Result  1134903170
    })();
});


// New route is lets say for another purpose.
// assume we hit r1 which has occupied 2 threads
// at the same time we hit r2, which also needs 2 threads. so it will take 2 threads from the remaining 3 threads
app.get('/r2', async(req,res)=>{
    console.log("Received request r2");
    let start = Date.now();
    const result = await Promise.all([pool.exec(43),pool.exec(44)]);
    console.log("Time taken: ", (Date.now()-start)/1000 +'s');
    console.log("Result ", (result[0]+result[1]).toString());
    res.send((result[0]+result[1]).toString());
});

function helloWorld(){
    return new Promise((resolve,reject)=>{
     setTimeout(()=>{
         resolve('Hello world');
     },3000);
    });
}

app.get('/async', (req,res)=>{
    console.log("Request received in async at "+ new Date(Date.now()).toLocaleString("en-US", {timeZone: 'Asia/Kolkata'}));
    helloWorld().then((data)=>{
        res.send(data);
    }).catch((exc)=>{
        res.status(500);
    });
});

app.get('/fast', (req,res)=>{
    console.log("Request received in fast at "+ new Date(Date.now()).toLocaleString("en-US", {timeZone: 'Asia/Kolkata'}));
   res.send("I am fast");
});

app.listen(3000);