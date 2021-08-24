const mysql = require('mysql2');
require('dotenv').config();

const con = mysql.createConnection({
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.end();
});