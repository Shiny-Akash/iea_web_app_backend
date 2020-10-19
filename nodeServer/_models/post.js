const { Schema, model, Types } = require("mongoose");

const Post = new Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        maxlength: 255,
        minlength: 5
    },
    body: {
        type: String,
        required: true,
        minlength: 10
    },
    numlikes: {
        type: Number,
        default: 0
    },
    numcomments: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const Like = new Schema({
    postId: {
        type: Types.ObjectId,
        required: true
    },
    username: {
        type: String,
        required: true
    }
})

module.exports.Post = model('Post', Post);
module.exports.Like = model('Like', Like)