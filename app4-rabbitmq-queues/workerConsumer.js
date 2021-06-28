const {parentPort } = require("worker_threads");
const rq = require('amqplib/callback_api');
const fibObj = require('./math-logic/fibonacci-series');


// const start = workerData.start
// const end = workerData.end
const queueName = 'amoghqueue';
let ch = null;

rq.connect('amqp://localhost', (err, conn) => {
    if (err) process.exit();
    else {
      conn.createChannel((err, channel) => {
        ch = channel;
        channel.assertQueue(queueName);
        channel.consume(
          queueName,
          (message) => {
            //console.log("Consumer: "+message.content.toString());
            let fibNum = fibObj.calculateFibonacciValue(parseInt(message.content.toString()));
            console.log("For: "+message.content.toString()+" From Consumer worker: "+fibNum);
          },
          { noAck: true}
        );
      });
    }
  });

  parentPort.on("message", e => {
    // Dispatch here. For instance:
    if (e.message === "fib cal") {
      sendQueue(e.number, e.queue);
    }
  });

  function sendQueue(number, queueName) {
    console.log("Producer: "+number);
          // let fibNum = fibObj.calculateFibonacciValue(number);
    ch.assertQueue(queueName);
    ch.sendToQueue(queueName, Buffer.from(number.toString()));
  }