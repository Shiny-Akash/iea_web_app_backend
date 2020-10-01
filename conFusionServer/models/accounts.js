const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema= new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var Accounts = mongoose.model('Promotion', accountSchema);

module.exports = Accounts;