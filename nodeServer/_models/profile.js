const { Schema, model } = require("mongoose");

const profile = new Schema({
    firstname: {
        type: String,
        default: '',
    },
    lastname: {
        type: String,
        default: '',
    },
    phoneno: { 
        type: String,
        default: ''
    },
    emailid: {
        type: String,
        default: '',
    },
    emailVerificationDone: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: null
    }
})

module.exports.Profile = model('Profile', profile);