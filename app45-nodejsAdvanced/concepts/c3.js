const https = require('https'); // doesnt use threadpool it uses OS to do the work
const crypto = require('crypto'); // takes threadpool
const fs = require('fs'); // takes threadpool

// Learning: https is independent of threadpool while fs and crypto are threadpool dependent so they might take time while https is OS operation so
// it returns quickly.

const start = Date.now();


function doRequest(){
    https.request('https://www.google.com',(res)=>{
        res.on('data',()=>{});
        res.on('end', ()=>{
            console.log("Network ",Date.now()-start);
        })
    }).end();
}


function doHash(){
    crypto.pbkdf2('a','b',100000, 512, 'sha512', ()=>{
        console.log('Hash:', Date.now()-start);
    });
}


doRequest();


fs.readFile('c3.js','utf8', ()=>{
    console.log('fs:', Date.now()- start);
});

doHash();
doHash();
doHash();
doHash();
doHash();
