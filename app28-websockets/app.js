var express = require('express');
var app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));
//middleware for static resources
app.use(express.static(path.join(__dirname,'public')));

const Chat = require('./models/chat');

app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/getjson', function(req, res,next) {
    return res.json({
        "hello": "world"
    })
});

io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('join', function(data) {
        console.log(data);
    });

    client.on('messages', function(data) {
            const chat = new Chat({
                body: data
            });
            //save chat in db and then respond to client
            chat.save().then((result)=>{
                client.emit('broad', data);
                client.broadcast.emit('broad',data);
            }).catch((err)=>{
                console.log(err);
            });
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
    server.listen(3000);
}).catch((err)=>{
    console.log("error connecting to db: "+err);
});
