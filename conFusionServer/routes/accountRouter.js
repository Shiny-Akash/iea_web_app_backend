const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {Accounts , validate} = require('../models/accounts');
const { token } = require('morgan');

const accountRouter = express.Router();

accountRouter.use(bodyParser.json());
accountRouter.post('/signup', async (req,res) => {
    console.log('this is signup ####################');
    const { username ,password} = req.body
    let user = await Accounts.findOne({username});
    if(user) return res.status(400).json({"message" :"User already exists!!"})
    let account = new Accounts({ 
        username: username,
        password: password
        });
    const salt = await bcrypt.genSalt(10);
    account.password = await bcrypt.hash(password,salt)    
    account = await account.save();
    res.send(account);

})
accountRouter.post("/login", async(req, res)=>{
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    const { username ,password} = req.body
    let user = await Accounts.findOne({username});
    if(!user) return res.status(400).json({"message" :"User not found!!"})
    //let pass = user.password;
    let isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(400).json({"message":"Incorrect Password"})

    // return jwt
    let token = jwt.sign({username: 'aaaaa'}, 'mysecret', { expiresIn: '1h'});
    res.cookie('token', token)
    res.json({"message": "login successful !"})
})

accountRouter.get("/:id", async (req, res) => {
    let token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, 'mysecret', (err, payload) => {
        if (err) {
            console.log(err)
            return res.sendStatus(403);
        }
        console.log(payload, 'this is the username present in the token')

        res.send('working..')
    })
})
module.exports = accountRouter;
