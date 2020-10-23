const {authorise} = require('../_middlewares/auth')
const { verificationToken } = require('../_models/verificationToken')
const { Profile } = require('../_models/profile')
const { User } = require('../_models/user')

const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const mailRouter = express.Router();

mailRouter.post('/send/:username', authorise, async (req, res) => {
    const { emailid } = req.body.profile;
    const username = req.params.username;
    
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
            text: 'Please visit the below link to verify your mail id ' + 'http://localhost:8080/api/mail/verify/' + data.token
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

mailRouter.get('/verify/:token', async (req, res) => {
    let token = req.params.token;
    var username = ''
    await verificationToken.findOne({token}, (err, data) => {
        if (!data) {
            return res.status(400).render('message', { message: 'Invalid Token '});
        }
        username = data.username;
    })

    var user;
    await User.findOne({ username: username }, (err, data) => user = data);
    await Profile.findOne({ _id: user.profileId }, (err, profiledata) => {
        profiledata.emailVerificationDone = true;
        profiledata.save();
        res.render('message', {message: 'Email Verified'});
    })
})

module.exports = mailRouter;