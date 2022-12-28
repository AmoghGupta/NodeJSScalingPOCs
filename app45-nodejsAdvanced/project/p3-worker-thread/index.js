// As the documentation says:

// Workers are useful for performing CPU-intensive JavaScript operations; 
// do not use them for I/O, since Node.js’s built-in mechanisms for performing operations asynchronously 
// already treat it more efficiently than Worker threads can.

const { Worker} = require('worker_threads');
const express = require('express');
const app = express();
const crypto = require('crypto');

app.get('/', (req,res)=>{
    const workerData = "Web workers node js";
    // creating worker thread from main thread
    const worker = new Worker('./worker.js', { workerData });
    // main thread listening to worker message
    worker.on('message', (data)=>{
        console.log("Worker received message");
        res.send(data);
    });
    // main thread listening to worker error
    worker.on('error', (err)=>{
        console.log("Error executing worker: "+err);
        res.sendStatus(500);
    });
    // main thread exit
    worker.on('exit', (code) => {
        console.log("Worker exiting");
        if (code !== 0){
            res.sendStatus(500);
        }
    });
});


app.get('/fast', (req,res)=>{
    res.send('this was fast');
});

app.listen(3000);



