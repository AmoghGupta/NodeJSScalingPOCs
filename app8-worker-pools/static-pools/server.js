const { StaticPool } = require('node-worker-threads-pool');

const filePath = './worker.js';

//  A constant pool with 4 threads
const pool = new StaticPool({
  size: 4,
  task: filePath,
  workerData: 'workerData!'
});


let start = 0;
let end = 0;
let promArr = [];
let finalAnswer = [];

let startTime= new Date();
for (let k = 1; k <=100; k++) {
  start = start==0?2:end+1;
  end = k*6000;
  // This will choose one idle worker in the pool
  // to execute your heavy task without blocking
  // the main thread!
  promArr.push(pool.exec({start,end})); 
}

Promise.all(promArr).then((values) => {
  finalAnswer= values;
  let answer = values.reduce((a, b) => a + b)
  console.log(answer);
  console.log((new Date().getTime()-startTime.getTime())/1000)%60;
})
