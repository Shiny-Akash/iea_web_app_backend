const express = require('express');
const authorise = require('../middlewares/auth');
const { Profile } = require('../models/profile')

const profileRouter = express.Router();

profileRouter.get('/:username', authorise, (req, res) => {
    Profile.findOne({username: req.params.username}, (err, data) => {
        res.json({ profile: data});
    })
})

module.exports = profileRouter;