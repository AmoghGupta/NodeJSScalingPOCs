const express = require('express');
const { Worker } = require("worker_threads");

const app = express();

const worker = new Worker("./workerConsumer.js");

app.get('/', (req, res) => {
  worker.postMessage({
    message:'fib cal',
    number:req.query.number,
    queue:'amoghqueue'
  });
  // sendQueue();
  res.send(`<h1>Done</h1>`);
});

app.listen(3000, () => console.log('Express server is running on port 3000'));