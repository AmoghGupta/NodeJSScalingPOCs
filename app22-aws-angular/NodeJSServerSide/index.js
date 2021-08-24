const express = require('express')
const app = express();
const port = 3000;
const path = require('path');

// pointing it to the client side dist folder
// making client side angular dist folder as static resource
app.use(express.static(path.join(__dirname,'..','/ClientAngular/dist/aws-angular')));

// app.use('/public', express.static(path.join(__dirname,'/public')));

app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname,'/public/index.html'));
  res.sendFile(path.join(__dirname,'..','/ClientAngular/dist/aws-angular'+'/index.html'));
});

app.get('/json',(req,res)=>{
  res.json([{"description": "bar"}]);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});