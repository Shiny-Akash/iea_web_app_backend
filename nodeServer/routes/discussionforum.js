const express = require('express');
const authorise = require('../_middlewares/auth');

const forumRouter = express.Router();

forumRouter.post('/:username', authorise, async (req, res) => {
    let newpost = req.body.post;
    res.json({ message: "this will store posts in the database"})
})

forumRouter.get("/:username", authorise, async (req, res) => {
    res.json({message: "these will be populated with public posts"});
})

module.exports = forumRouter;