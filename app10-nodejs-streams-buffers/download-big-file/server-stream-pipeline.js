// If the response will quit or the client closes the connection - 
// then the read stream is not closed or destroy which leads to a memory leak. (older pipe approach)
// if you use pipeline, it would close all other streams and 
// make sure that there are no memory leaks.

const { pipeline } = require('stream');
var http = require("http");
var fs = require("fs");
const express = require('express');
const app  = express();


app.get('/download',function(req,res){
    var filename = "test.zip";
    var stat = fs.statSync(filename);
    res.setHeader('Content-disposition', 'attachment; filename=amoghfile.zip');
    res.writeHeader(200, {"Content-Length": stat.size});
    var fReadStream = fs.createReadStream(filename);
    // piping the readable stream to writable stream
    pipeline(
        fReadStream,
        res,
        err => {
          if (err)
            console.error('Pipeline failed.', err);
          else
            console.log('Pipeline succeeded.');
        }
      );
});

app.listen(8000,()=>{
    console.log('Listening to port 8000');
});