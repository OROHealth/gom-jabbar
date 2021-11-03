const { Schema, model } = require('mongoose');
const Joi = require('joi');

const now = new Date().getTime();

const UserSchema  = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        default: now
    }
});

function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(user);
}

const User = model('user', UserSchema);

module.exports.User = User;
module.exports.validate = validateUser;