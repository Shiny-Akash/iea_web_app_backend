const express = require('express');
const authorise = require('../middlewares/auth');

const forumRouter = express.Router();

forumRouter.get("/:username", authorise, async (req, res) => {
    // this should return the posts for discussion forums 
    // bcoz forum page will be the default page
    res.json({ username: req.username });
})

module.exports = forumRouter;