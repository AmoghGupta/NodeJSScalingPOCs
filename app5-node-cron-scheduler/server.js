const express = require('express');
const cron = require('node-cron')
const app = express();
const mailer = require('nodemailer');

const transporter = mailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: '',
        pass: ''
    }
});

function sendEmail(message){
    //sending the email
    transporter.sendMail({
        from: '"Amogh" <>',
        to: '"Suesha Gupta" <>',
        subject: 'Scheduled Email',
        text: message
    })
        .then(_ => {console.log("Email sent on " + new Date())})
        .catch(error => {console.log(error)});
}

app.get('/', (req, res) => {
    let userInfo = req.query.user;
    let userData = req.query.data;
    console.log(userInfo+' '+userData);
    cron.schedule('6    20    *    *    *', () => {
        sendEmail(`Hey ${userInfo}, this is your data: ${userData}`);
    },{
        scheduled: true
    });
    res.send(`<h1>Email sent</h1>`);
});


app.listen(3000, () => console.log('Express server is running on port 3000'));