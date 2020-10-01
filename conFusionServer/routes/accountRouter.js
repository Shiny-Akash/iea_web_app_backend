const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const {Accounts , validate} = require('../models/accounts');

const accountRouter = express.Router();

accountRouter.use(bodyParser.json());
accountRouter.post('/signup', async (req,res) => {
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
    res.send({"message": "login successfull!!!"}) 
})
/* 
accountRouter.route('/:account')
.get((req,res,next) => {
    Accounts.find({})
    .then((account) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(account);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    Accounts.findOneAndUpdate({username : req.params.account}, {
        $set: req.body
    }, { new: true })
    .then((account) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(account);
    }, (err) => next(err))
    .catch((err) => next(err));
}); */
/* 
accountRouter.route('/signup')
.post((req, res, next) => {
    Accounts.create(req.body)
    .then((account) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(account);
    }, (err) => next(err))
    .catch((err) => next(err));
});
 */


module.exports = accountRouter;