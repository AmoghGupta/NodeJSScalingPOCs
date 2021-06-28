// fs.createReadStream() does open a file and it opens that file asynchronously without blocking.

var http = require("http");
var fs = require("fs");
const express = require('express');
const app  = express();

app.get('/download',function(req,res){
    var filename = "bigfile.mp4";
    var stat = fs.statSync(filename);
    res.setHeader('Content-disposition', 'attachment; filename=amoghfile.mp4');
    res.writeHeader(200, {"Content-Length": stat.size});
    var fReadStream = fs.createReadStream(filename);
    // piping the readable stream to writable stream
    fReadStream.on('error', function(e){

    }).pipe(res);
});

app.get('/test',function(req,res){
    res.status(200).json({"test":"api"});
});

app.listen(8000,()=>{
    console.log('Listening to port 8000');
});