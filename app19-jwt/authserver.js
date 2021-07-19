require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// this is ideally stored in DB or redis cache
// but for the sake of learning storing it in in-memory
let refreshTokens = [];

function generateAccessToken(user){
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'});
}

//refresh token used to generate access token again
app.post('/token',(req,res,next)=>{
    const refreshToken = req.body.token;
    if(refreshToken == null) return res.sendStatus(401);
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    
    //if refresh token is valid
    jwt.sign(refreshToken, process.env.REFRESH_SECRET_TOKEN, (err, user)=>{
        if(err) return res.sendStatus(403);
        // generate access token and send new access token to user
        const accessToken = generateAccessToken({name: user.name});
        res.json({
            accessToken
        })
    });

});

app.post('/login',(req,res,next)=>{
    //Authenticate 
    const username = req.body.username;
    //using user details to generate JWT
    const user = {name: username};
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET_TOKEN);
    refreshTokens.push(refreshToken);
    res.json({
        accessToken,
        refreshToken
    });
});


app.listen(4000,()=>{
    console.log("node js server started.");
})