var express = require('express');
var app = express();

app.get('/server2', function (req, res) {
    setTimeout(()=>{
        res.send('Hello World from server 2 check');
    },4000);
});

var server = app.listen(8082, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});