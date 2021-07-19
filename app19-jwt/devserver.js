require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

const posts = [
    {
        username:"Amogh",
        title:"Post 1"
    },
    {
        username:"Suesha",
        title: "Post 2"
    },
    {
        username: "Ayush",
        title: "Post 3"
    }
];

//middleware 
function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null){
        return res.sendStatus(401);
    } 
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
        if(err){
            return res.sendStatus(403);
        };
        req.user = user;
        next();
    });
}


app.get('/posts',authenticateToken,(req,res,next)=>{
    res.json(posts.filter((post)=>{
        return post.username === req.user.name
    }));
});

app.listen(3000,()=>{
    console.log("node js server started.");
})