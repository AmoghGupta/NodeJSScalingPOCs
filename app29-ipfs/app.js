//Required modules
const ipfsAPI = require('ipfs-api');
const express = require('express');
const fs = require('fs');
const app = express();

//Connceting to the ipfs network via infura gateway
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

//Reading file from computer
let testFile = fs.readFileSync(__dirname+"/test.html");
//Creating buffer for ipfs function to add file to the system
let testBuffer = new Buffer(testFile);

//Addfile router for adding file a local file to the IPFS network without any local node
app.get('/addfile', function(req, res) {

    ipfs.files.add(testBuffer, function (err, file) {
        if (err) {
          console.log(err);
          res.status(503);
        }
        console.log(file);
        return res.json({
          file,
          "uploaded":"ok"
        });
      })

})
//Getting the uploaded file via hash code.
app.get('/getfile', function(req, res) {
    
    //This hash is returned hash of addFile router.
    const validCID = 'QmTPsvXGgoU7euVaCzE8oCVmGrfL3f5bbN51hsi6AborGv'

    ipfs.files.get(validCID, function (err, files) {
        files.forEach((file) => {
          // console.log(file.path)
          // console.log(file.content.toString('utf8'))
          res.send(file.content.toString('utf8'));
        })
      })

})


//https://ipfs.infura.io:5001/api/v0/cat?arg=QmTPsvXGgoU7euVaCzE8oCVmGrfL3f5bbN51hsi6AborGv

app.listen(3000, () => console.log('App listening on port 3000!'))