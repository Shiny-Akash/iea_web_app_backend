const { Schema, model } = require("mongoose");

var verificationToken = new Schema({
    username: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now, index: { expires: "5m"} }
})

module.exports.verificationToken = model('VerificationToken', verificationToken);