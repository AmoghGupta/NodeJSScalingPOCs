const express = require('express');
const rateLimit = require("express-rate-limit");
require('dotenv').config();
const app = express();


// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);


// LIMITER 1
const limiter1 = rateLimit({
    windowMs: 10 * 1000, // 10 seconds
    max: 2, // limit each IP to 2 requests per windowMs,
    message:"Too many accounts created from this IP, please try again after an hour"
  });

  // LIMITER 2
const limiter2 = rateLimit({
    windowMs: 15 * 1000, // 15 seconds
    max: 2, // limit each IP to 2 requests per windowMs,
    message:"Too many requests from this IP, please try again after an hour"
  });

app.get('/api1',limiter1,(req,res)=>{
    return res.json({
        "resp1":"response from 1st api"
    });
})

app.get('/api2',limiter2,(req,res)=>{
    return res.json({
        "resp2":"response from 2nd api"
    });
})

app.listen(3000,()=>{
    console.log("server started");
})