const express = require('express');
const app  = express();
const fs = require('fs');

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

app.get('/video',function(req,res){
    
    const range = req.headers.range;
    if(!range){
        res.status(400).send("Requires range header");
    }
    
    const videoPath = "myvid.mp4";
    const videoSize = fs.statSync(videoPath).size;
    
    //we will buffer 1MB at a time
    const CHUNK_SIZE = 10 ** 6; //1MB
    const start = Number(range.replace(/\D/g,"")); // removing everything except digits hence bytes=0- will become 0
    const end = Math.min(start + CHUNK_SIZE, videoSize-1); //last chunk (start+chunksize) will be greater than video size hence we will send videosize instead

    console.log("Start: "+start+" end: "+end);

    //creating response headers for videos
    const contentLength = end - start+1;
    const headers = {
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Range" : `bytes ${start}-${end}/${videoSize}`,
        "Content-Type": "video/mp4"
    };
    //partial content hence header status is 206
    res.writeHead(206,headers);

    //Creating a reader video stream from videoPath and reading the start and end bytes i.e chunk
    const videoStream = fs.createReadStream(videoPath,{start,end});
    //piping readable stream to writable res stream
    videoStream.pipe(res);

});

app.listen(8000,()=>{
    console.log('Listening to port 8000');
})