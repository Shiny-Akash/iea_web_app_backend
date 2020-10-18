const express = require('express');
const authorise = require('../middlewares/auth');

const profileRouter = express.Router();

profileRouter.get('/:username', authorise, (req, res) => {
    res.json({ username: req.params.username });
})

module.exports = profileRouter;