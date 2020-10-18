const authorise = require('../middlewares/auth')
const { verificationToken } = require('../models/verificationToken')
const { Profile } = require('../models/profile')

const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const mailRouter = express.Router();

mailRouter.post('/send/:username', authorise, async (req, res) => {
    const { emailid, username }= req.body.profile;
    
    let token = crypto.randomBytes(16).toString('hex');
    const vertoken = new verificationToken({
        username , token
    })
    await vertoken.save((err, data) => {
        // send mail to the user
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'akasharul2101@gmail.com',
              pass: 'arulsenthil'
            }
          });
        var mailOptions = {
            from: 'akasharul2101@gmail.com',
            to: emailid,
            subject: 'IEA MAIL VERIFICATION',
            text: 'Please visit the below link to verify your mail id ' + 'http://localhost:8080/mail/verify/' + data.token
          };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

        res.json(data);
    })
})

mailRouter.get('/verify/:token', (req, res) => {
    let token = req.params.token;
    verificationToken.findOne({token}, (err, data) => {
        if (!data) {
            return res.render('message', { message: 'Invalid Token '});
        }
        let username = data.username;
        Profile.findOne({username}, (err, profiledata) => {
            profiledata.emailVerificationDone = true;
            profiledata.save();
            res.render('message', {message: 'Email Verified'});
        })
    })
})

module.exports = mailRouter;