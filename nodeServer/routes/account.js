const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {Accounts , validate} = require('../_models/accounts');
const { Profile } = require('../_models/profile')

const accountRouter = express.Router();

accountRouter.use(bodyParser.json());
accountRouter.post('/signup', async (req,res) => {
    const { username ,password} = req.body
    let user = await Accounts.findOne({username});
    if(user) return res.status(400).json({"message" :"User already exists!!"})

    // create new account and save
    let account = new Accounts({ 
        username: username,
        password: password
        });
    const salt = await bcrypt.genSalt(10);
    account.password = await bcrypt.hash(password,salt)    
    account = await account.save();

    // create new profile and save
    let profile = new Profile({username: username});
    profile = await profile.save();

    res.json({ message: 'signup successfull !' });

})
accountRouter.post("/login", async(req, res)=>{
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    const { username ,password} = req.body
    let user = await Accounts.findOne({username});
    if(!user) return res.status(400).json({"message" :"User not found!!"})
    let isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(400).json({"message":"Incorrect Password"})

    let token = jwt.sign({username}, 'mysecret', { expiresIn: '1h'});
    res.json({token, username});
})

module.exports = accountRouter;
