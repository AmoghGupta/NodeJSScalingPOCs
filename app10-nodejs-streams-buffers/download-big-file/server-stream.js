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
    fReadStream.on('data', function (chunk) {
        if(!res.write(chunk)){
            fReadStream.pause();
        }
    });
    fReadStream.on('end', function () {
        res.end();
    });
    res.on("drain", function () {
        fReadStream.resume();
    });
});

app.listen(8000,()=>{
    console.log('Listening to port 8000');
});