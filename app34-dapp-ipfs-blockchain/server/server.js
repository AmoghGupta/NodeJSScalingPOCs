//Required modules
const ipfsAPI = require('ipfs-api');
const express = require('express');
const fs = require('fs');
const app = express();
var multer  = require('multer');
require('dotenv').config() ;
const Web3 = require('web3');
const contractJSON = require('./contract/MemeOfTheDay.json');


//Connceting to the ipfs network via infura gateway
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})
const web3 = new Web3(new Web3.providers.HttpProvider( `http://127.0.0.1:7545`));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'/public/index.html'));
});


app.post('/uploadImage', upload.single('memeFile'), (req, res, next) => {
    const memefile = req.file;
    if (!memefile) {
      const error = new Error('Please upload a file');
      error.httpStatusCode = 400;
      return next(error)
    }

    let uploadedMemeFile = fs.readFileSync(__dirname+'/'+memefile['path']);

    ipfs.files.add(uploadedMemeFile, function (err, file) {
        if (err) {
            console.log(err);
            const error = new Error('Failed to upload to ipfs');
            error.httpStatusCode = 503;
            return next(error)
        }
        console.log(file);
        return res.json({
          file,
          "uploaded":"ok"
        });
      })
  });
  

//Getting the uploaded file via hash code.
app.get('/getMemeFile', function(req, res) {
    
    //This hash is returned hash of addFile router.
    const validCID = 'QmTPsvXGgoU7euVaCzE8oCVmGrfL3f5bbN51hsi6AborGv'

    ipfs.files.get(validCID, function (err, files) {
        files.forEach((file) => {
          // console.log(file.path)
          // console.log(file.content.toString('utf8'))
          res.send(file.content.toString('utf8'));
        })
      });

})


app.get('/getLatestHash', async function(req, res) {
    const memeSmartContract = new web3.eth.Contract(contractJSON.abi, '0xAdBa8665529Fa62703FDb0b82B99a184006Ab665');
    const hash = await memeSmartContract.methods.getMemeHash().call();
    // return res.json({
    //     "latestimghash":hash
    // });
    ipfs.files.get(hash, function (err, files) {
        files.forEach((file) => {
            // console.log(file.path)
            // console.log(file.content.toString('utf8'))  
            // res.setHeader("Content-Type","image/jpeg");
            // res.setHeader("Content-Dispositon","attachment; filename=" + "test.jpeg");        
            // res.send(file.content);

            res.writeHead(200, {
                'Content-Type': "image/jpeg",
                'Content-disposition': 'attachment;filename=' + "meme.jpeg",
            });
            res.end(Buffer.from(file.content, 'binary'));
        })
      });
})





// await contract.methods.updateGreeting(input).send({ from: accounts[0], gas: 40000 });


//https://ipfs.infura.io:5001/api/v0/cat?arg=QmTPsvXGgoU7euVaCzE8oCVmGrfL3f5bbN51hsi6AborGv

app.listen(3000, () => console.log('App listening on port 3000!'))