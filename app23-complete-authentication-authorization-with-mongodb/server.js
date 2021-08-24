const express= require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const port = 3000;
const path = require('path');
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
// need cookieParser middleware before we can do anything with cookies
app.use(cookieParser());

// set the view engine to ejs
app.set('view engine', 'ejs');
// use res.render to load up an ejs view file

const Blog = require('./models/blog');
const User = require('./models/user');

//middleware for static resources
app.use(express.static(path.join(__dirname,'public')));

function generateAccessToken(user){
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, {expiresIn: '600s'}); //expires in 10mins
}

// middleware for authenticating the tokens
function authenticateToken(req,res,next){
    
    /** Either ask user to send token in authorization header everytime manually */
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];

    /** OR server reads the token from cookies set by the server itself (this is a better way) */
     //reading the sid from cookies
     const token = req.cookies['sid'];
     console.log("Cookie reading: "+token);

    if(token == null){
        res.status(401).send('UnAuthorized');
    } 
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
        if(err){
            res.status(401).send('Token Expired');
        };
        req.user = user;
        next();
    });
}

app.post('/signin',(req,res,next)=>{
    const {email, password}  = req.body;
    //validate user
    User.find({email}).then((user)=>{
        if(!user){
            res.status(500).send('No such user exists.');
        }
        //validate hash password
        bcrypt.compare(password,user[0]['password'],(err, result)=>{
            if(!result){
                res.status(500).send('Wrong username and password');
            }
            const loggedInUser = user[0];
           
            // since user is authenticated 
            // now give him a jwt token
            const token  = generateAccessToken({
                username:loggedInUser['username'],
                email:loggedInUser['email'],
                phone:loggedInUser['phone'],
                userType:loggedInUser['userType:']
            });
            
            /** Either server sets the token in cookies for the user so that server can consume it directly from the client cookies*/
            // set token in cookie as sid
            // so that from next time until cookie expires 
            res.cookie('sid',token, { maxAge: 1000 * 60 * 10, httpOnly: true }); // cookie expires in 10mins

            /** Or provide the token to client so that he can add this token as authorization header in every request he makes */
            res.status(200).send({
                "loggedIn": true,
                "authToken": token
            });

        });
    }).catch((err)=>{
        res.status(500).send('No such user exists.');
    })
    
});

app.post('/signup',(req,res,next)=>{
    // console.log(req.body);
    const {username, password,phone,email,userType}  = req.body;
    if(username && password && phone && email && userType){

        bcrypt.hash(password,10,(err,hash)=>{
            if(err){
                res.status(500).send('Failed to Create User');
            }
            
            const user = new User({
                username: username,
                password :hash,
                phone: phone,
                email :email,
                userType: userType
            });
            // console.log(hash);
            // res.status(200).send('User created');
            user.save().then((result)=>{
             console.log(result);
             res.status(200).send('User created');
            }).catch((err)=>{
             console.log(err);
             res.status(500).send('Failed to Create User');
            });

        })

    }
    // console.log(username, password,phone,email,userType);
    
});

app.get("/add-blog",authenticateToken,(req,res)=>{
    //create a new blog
    // while saving we create an instance
   const blog = new Blog({
       title: 'new blog 3',
       snippet :'about my new blog',
       body: 'more about new blog'
   });
   blog.save().then((result)=>{
    res.send(result);
   }).catch((err)=>{
    console.log(err);
    res.status(500).send('Something broke!');
   });
});

app.get('/get-blogs',authenticateToken,(req,res)=>{
    // while finding we can directly query Blog without creating an instance
    Blog.find().then((results)=>{
        // res.send(results);
        res.render('pages/allBlog',{
            results:results,
            header:"All Blogs"
        });
    }).catch((err)=>{
        console.log(err);
        res.status(500).send('Something broke!');
    });
});


app.get('/single-blog',authenticateToken,(req,res)=>{
    // while finding we can directly query Blog without creating an instance
    Blog.findById('610a7c9a58d8db3586b66104').then((result)=>{
        // res.send(result);
        res.render('pages/singleBlog',{
            results:[result],
            header:"Single Blog"
        });
    }).catch((err)=>{
        console.log(err);
        res.status(500).send('Something broke!');
    });
});

//connect to mongodb and start up the server
const dbURI = `mongodb+srv://${process.env.username}:${process.env.password}@nodejsmongo.ffvjq.mongodb.net/${process.env.database}?retryWrites=true&w=majority`;
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((result)=>{
    console.log("connected to db");
    // we listen to connection only after db connection is established
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    });
}).catch((err)=>{
    console.log("error connecting to db: "+err);
});
