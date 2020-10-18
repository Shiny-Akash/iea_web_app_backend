const mongoose = require('mongoose');
const Joi = require('joi');
var Accounts = mongoose.model('Accounts', new mongoose.Schema({
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
}));
function validate(Accounts){
    const schema = Joi.object({
        username: Joi.string().min(1).required(),
        password: Joi.string().min(3).required()
    })
    return schema.validate(Accounts)
}
module.exports.validate = validate;
module.exports.Accounts = Accounts;