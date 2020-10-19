const express = require('express');
const authorise = require('../_middlewares/auth');
const { Post, Like, Comment } = require('../_models/post');

const forumRouter = express.Router();

// get public comments
forumRouter.get("/comment", async (req, res) => {
    await Comment.find({}, (err, data) => {
        res.json(data);
    })
})

// create post
forumRouter.post('/:username', authorise, async (req, res) => {
    const { title, body } = req.body;
    const username = req.params.username;

    let post = new Post({
        username, title, body
    })
    await post.save();
    res.json({ message: "created new post successfully !"})
})

// get user posts
forumRouter.get("/:username", authorise, async (req, res) => {
    await Post.find({ username: req.params.username }, (err, data) => {
        res.json(data);
    })
})

// get public posts
forumRouter.get("/", async (req, res) => {
    await Post.find({}, (err, data) => {
        res.json(data);
    })
})

// like post
forumRouter.post("/like/:username", authorise, async (req, res) => {
    const username = req.params.username;
    const { _id } = req.body;

    let post = await Post.findOne({ _id })
    post.numlikes += 1;
    await post.save();

    let like = new Like({
        postId: _id, username
    });
    await like.save();

    res.json({post})
})

// unlike post
forumRouter.post("/unlike/:username", authorise, async (req, res) => {
    const username = req.params.username;
    const { _id } = req.body;

    let post = await Post.findOne({ _id })
    post.numlikes -= 1;
    await post.save();

    await Like.deleteOne({ username });

    res.json({post})
})

// create comment 
forumRouter.post("/comment/:username", authorise, async (req, res) => {
    const username = req.params.username;
    const { _id } = req.body.post;
    const { body } = req.body.comment;

    let post = await Post.findOne({ _id })
    post.numcomments += 1;
    await post.save();

    let comment = new Comment({
        postId: _id, username, body
    });
    await comment.save();

    res.json({ comment })
})

// get user comments
forumRouter.get("/comment/:username", authorise, async (req, res) => {
    await Comment.find({ username: req.params.username }, (err, data) => {
        res.json(data);
    })
})

module.exports = forumRouter;
