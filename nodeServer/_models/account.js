const { model, Schema } = require('mongoose');

const Account = new Schema({
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports.Account = model('Account', Account );