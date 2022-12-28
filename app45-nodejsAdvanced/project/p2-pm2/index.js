// in mac mac m1 10 cores present
// pm2 start index.js -i 0  ===> so this command starts 10 fork in the cluster

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



