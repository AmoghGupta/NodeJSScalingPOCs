const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());
const SERVERPORT = 5000;


//web push KEYS (run this command ./node_modules/.bin/web-push generate-vapid-keys)
const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;
//set keys in webpush
webpush.setVapidDetails('mailto:test@test.com',publicVapidKey,privateVapidKey);

//Subscribe route
app.post('/subscribe',(req,res)=>{
    //get push subscription object
    const subscription = req.body;
    
    //send 201
    res.status(201).json({});
    
    //create payload
    const payload = JSON.stringify({title:'Push Test'});

    //Pass object into send notification function
    webpush.sendNotification(subscription, payload).catch(err=>console.error(err));
});



app.listen(SERVERPORT,()=>{
    console.log('Server started');
})