const express = require('express');
const authorise = require('../_middlewares/auth');
const { Post } = require('../_models/post');

const forumRouter = express.Router();

forumRouter.post('/:username', authorise, async (req, res) => {
    const { title, body } = req.body;
    const username = req.params.username;

    let post = new Post({
        username, title, body
    })
    await post.save();
    res.json({ message: "created new post successfully !"})
})

forumRouter.get("/:username", authorise, async (req, res) => {
    await Post.find({ username: req.params.username }, (err, data) => {
        res.json(data);
    })
})

module.exports = forumRouter;