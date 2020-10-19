const { Schema, model } = require("mongoose");

const Post = new Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        maxlength: 255
    },
    body: {
        type: String,
        required: true,
        minlength: 10
    },
    numlikes: Number,
    numcomments: Number,

}, { timestamps: true })

const Likes = new Schema({
})

module.exports = model('Post', Post);