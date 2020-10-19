const express = require('express');
const authorise = require('../_middlewares/auth');
const { Profile } = require('../_models/profile')

const profileRouter = express.Router();

profileRouter.get('/:username', authorise, (req, res) => {
    Profile.findOne({username: req.params.username}, (err, data) => {
        res.json({ profile: data});
    })
})

profileRouter.patch('/:username', authorise, (req, res) => {
    let profile = req.body.profile;
    console.log(profile)
    Profile.updateOne({username: req.params.username}, profile, (err, data) => {
        res.json({data});
    })
})

module.exports = profileRouter;