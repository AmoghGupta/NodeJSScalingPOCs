var express = require('express');
var fetch = require("node-fetch");
var redis = require("redis");
require('dotenv').config();

const PORT = process.env.PORT;
const REDIS_PORT = process.env.REDIS_PORT;

const client = redis.createClient(REDIS_PORT);

const app = express();

async function getRepos(req, res,next){
    try{
        console.log('Fetching data');
        const {username} = req.params;
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const data = await response.json();
        const reposLength = data.length;

        //set data to redis
        client.setex(username,3600,reposLength);
        res.send({length:reposLength});

    }catch(err){
        console.log(err);
        res.status(500);
    }
}

function cacheMW(req, res, next){
    const {username} = req.params;
    client.get(username,(err, data)=>{
        if(err){
            throw err;
        }
        if(data != null){
            res.send({'length':data})
        }else{
            next();
        }
    });
}

app.get('/repos/:username',cacheMW,getRepos);

app.listen(5000,()=>{
    console.log('listening to '+PORT);
})



