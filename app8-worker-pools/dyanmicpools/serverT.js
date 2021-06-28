const express = require("express");
const app = express();
const { DynamicPool } = require('node-worker-threads-pool');
//  A dynamic pool with 4 threads
const dynamicPool = new DynamicPool(4);


app.get("/sumofprimeswiththreads", async (req, res) => {
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
        promArr.push(
          dynamicPool.exec(
            {
              task: (obj)=>{
                var sum = 0;
                for (var i = obj.start; i <= obj.end; i++) {
                  for (var j = 2; j <= i / 2; j++) {
                    if (i % j == 0) {
                      break
                    }
                  }
                  if (j > i / 2) {
                    sum += i
                  }      
                }
                return sum;
              },
              param: {start,end}
            }
          )
        ); 
      }
      
    let sum = await Promise.all(promArr).then((values) => {
    finalAnswer= values;
    let answer = values.reduce((a, b) => a + b)
    return answer;
    });

    res.json({
        number: 600000,
        sum: sum,
        timeTaken: (new Date().getTime()-startTime.getTime())/1000%60
    });
})

app.get("/test", async (req, res) => {
  res.json({
    number: "i am not blocked"
  })
})
app.listen(7777, () => console.log("listening on port 7777"))