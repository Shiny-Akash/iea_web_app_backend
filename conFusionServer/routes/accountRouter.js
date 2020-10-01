const express = require('express');
const bodyParser = require('body-parser');

const Accounts = require('../models/accounts');

const accountRouter = express.Router();

accountRouter.use(bodyParser.json());

accountRouter.route('/')
.post((req, res, next) => {
    Accounts.create(req.body)
    .then((account) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(account);
    }, (err) => next(err))
    .catch((err) => next(err));
});

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
    Accounts.findAndUpdate({}, {
        $set: req.body
    }, { new: true })
    .then((account) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(account);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = accountRouter;