const express = require('express');
const rateLimit = require("express-rate-limit");
require('dotenv').config();
const app = express();
const slowDown = require("express-slow-down");


// Basic rate-limiting middleware for Express that slows down responses rather than blocking them outright. 
// Use to limit repeated requests to public APIs and/or endpoints such as password reset.


// only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
// app.enable("trust proxy"); 

const speedLimiter = slowDown({
    windowMs: 60 * 1000, // 60 seconds
    delayAfter: 5, // allow 5 requests per 60 seconds, then...
    delayMs: 500 // begin adding 500ms of delay per request above 5:
  });
  
app.get('/api1',speedLimiter,(req,res)=>{
    return res.json({
        "resp1":"response from 1st api"
    });
})

app.listen(3000,()=>{
    console.log("server started");
})