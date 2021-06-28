const express = require('express');       
const path = require('path');              
const fs = require('fs-extra');            
const busboy = require('connect-busboy');   // Middleware to handle the file upload https://github.com/mscdex/connect-busboy
const { pipeline } = require('stream');


const app = express(); // Initialize the express web server
const uploadPath = path.join(__dirname, 'fu/'); 
// fs.ensureDir(uploadPath);

// busy boy middleware
// buffer size set 
app.use(busboy({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
})); 

app.use(express.static('public'))
/**
 * Create route /upload which handles the post request
 */
app.route('/upload').post((req, res, next) => {
    // Pipe request to busboy
    req.pipe(req.busboy); 

    // busy boy emitter
    req.busboy.on('file', (fieldname, file, filename) => {
        console.log(`Upload of '${filename}' started`);
        // Create a write stream of the new file
        const fstream = fs.createWriteStream(path.join(uploadPath, filename));
        pipeline(
            file,
            fstream,
            err => {
              if (err){
                console.error('Pipeline failed.', err);
                res.redirect('back');
              }
                
              else{
                console.log('Pipeline succeeded.');
                res.redirect('back');
              }
            }
          );
    });
});


/**
 * Serve the basic index.html with upload form
 */
app.route('/').get((req, res) => {
    // res.writeHead(200, {'Content-Type': 'text/html'});
    return res.sendFile(path.join(__dirname, '/index.html'));
});

const server = app.listen(3200, function () {
    console.log(`Listening on port ${server.address().port}`);
});