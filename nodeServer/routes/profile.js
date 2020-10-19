const express = require('express');
const authorise = require('../_middlewares/auth');
const { Profile } = require('../_models/profile');
const { User } = require('../_models/user');

const profileRouter = express.Router();

profileRouter.get('/:username', authorise, async (req, res) => {
    const user = await User.findOne({ username: req.params.username });
    await Profile.findOne({ _id: user.profileId }, (err, data) => {
        res.json({ profile: data});
    })
})

profileRouter.patch('/:username', authorise, async (req, res) => {
    let profile = req.body.profile;
    const user = await User.findOne({ username: req.params.username });
    await Profile.updateOne({ _id: user.profileId }, profile, (err, data) => {
        res.json({data});
    })
})

module.exports = profileRouter;