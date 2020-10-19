const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { Account } = require('../_models/account');
const { Profile } = require('../_models/profile');
const { User } = require('../_models/user');

const accountRouter = express.Router();

accountRouter.use(bodyParser.json());
accountRouter.post('/signup', async (req,res) => {
    const { username ,password } = req.body
    let tempuser = await User.findOne({username});
    if(tempuser) return res.status(400).json({"message" :"User already exists!!"})

    // create new account and save
    const salt = await bcrypt.genSalt(10);
    hashpassword = await bcrypt.hash(password,salt)
    let account = new Account({ 
        password: hashpassword
    });   
    account = await account.save();

    // create new profile and save
    let profile = new Profile({});
    profile = await profile.save();

    // create new user and save
    let user = new User({
        username: username,
        accountId: account._id,
        profileId: profile._id
    })
    await user.save()

    res.json({ message: 'signup successfull !' });

})
accountRouter.post("/login", async(req, res)=>{
    const { username ,password } = req.body
    let user = await User.findOne({ username });
    if(!user) return res.status(400).json({"message" :"User not found!!"})

    let account = await Account.findOne({ _id: user.accountId })
    let isMatch = await bcrypt.compare(password, account.password)
    if(!isMatch) return res.status(400).json({"message":"Incorrect Password"})

    let token = jwt.sign({ username }, 'mysecret', { expiresIn: '1h'});
    res.json({token, username});
})

module.exports = accountRouter;
