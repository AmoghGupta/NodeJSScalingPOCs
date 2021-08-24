const express= require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const port = 3000;
const path = require('path');
const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
// use res.render to load up an ejs view file

const Blog = require('./models/blog');

//middleware for static resources
app.use(express.static(path.join(__dirname,'public')));

app.get("/add-blog",(req,res)=>{
    //create a new blog
    // while saving we create an instance
   const blog = new Blog({
       title: 'new blog 2',
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

app.get('/get-blogs',(req,res)=>{
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


app.get('/single-blog',(req,res)=>{
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
