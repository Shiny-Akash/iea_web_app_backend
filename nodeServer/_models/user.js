const { Schema, Types, model } = require("mongoose");

const User = new Schema({
    username: {
        type: String,
        required: true
    },
    accountId: {
        type: Types.ObjectId,
        required: true
    },
    profileId: {
        type: Types.ObjectId,
        required: true,
    }
}, { timestamps: true })

module.exports = model('User', User);