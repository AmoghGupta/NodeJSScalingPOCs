// apache benchmark
// ab -c 50 -n 500 localhost:3000/fast
// ab -c 1 -n 1 localhost:3000/

// every child will have 1 thread alloted to their pool, by default its 4 threads in threadpool for each fork.
process.env.UV_THREADPOOL_SIZE = 1;

const cluster = require('cluster');
// is it master mode?
if(cluster.isMaster){
    console.log("Is Master"+cluster.isMaster);
    console.log(`In master mode with process: ${process.pid}`);
    // if yes, index.js to be executed again but in slave mode
    cluster.fork();
    cluster.fork();
}else{
    console.log(`In child mode with process: ${process.pid}`);
    const express = require('express');
    const app = express();
    const crypto = require('crypto');
    
    function doWork(duration){
        const start = Date.now();
        while(Date.now() - start < duration){}
    }

    app.get('/', (req,res)=>{
        //doWork(3000);
        //res.send('hi there');
        crypto.pbkdf2('a','b',100000, 512, 'sha512', ()=>{
            res.send('hi there');
        });
    });


    app.get('/fast', (req,res)=>{
        res.send('this was fast');
    });

    app.listen(3000);
}


