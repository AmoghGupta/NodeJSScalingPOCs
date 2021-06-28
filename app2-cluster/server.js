// Cluster is mainly used for vertically (adding more power to your existing machine) scale your nodejs web server. 
// It is built on top of the child_process module. In an Http server, 
// the cluster module uses child_process.fork() to automatically fork processes and sets up a master-slave architecture
// where the parent process distributes the incoming request to the child processes in a round-robin fashion. 
// Ideally, the number of processes forked should be equal to the number of cpu cores your machine has.

const express = require('express');
const fibObj = require('./math-logic/fibonacci-series');
const cluster = require('cluster');
const totalCpus = require('os').cpus().length;

if (cluster.isMaster) {
  console.log("Total CPUs: "+totalCpus);
  for (let i = 0; i < totalCpus; i++) {
    cluster.fork();
  }
  cluster.on('online', (worker) => {
    console.log(
      `Worker Id is ${worker.id} and the PID is: ${worker.process.pid}`
    );
  });
  cluster.on('exit', (worker) => {
    console.log(
      `Worker Id ${worker.id} with PID ${worker.process.pid} is offline`
    );
  });
} else {
  const app = express();
  app.get('/', (req, res) => {
    let number = fibObj.calculateFibonacciValue(
      Number.parseInt(req.query.number)
    );
    res.send(`<h1>${number}</h1>`);
  });

  app.listen(3000, () => console.log('Express server is running on port 3000'));
}