const { Schema, model } = require("mongoose");

var verificationToken = new Schema({
    username: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true,
        expires: '10m'
    }
})

module.exports.verificationToken = model('VerificationToken', verificationToken);