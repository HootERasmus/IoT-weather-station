const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const iterations = 100;
const keylen = 32;
const saltBytes = 16;
const digest = 'sha512';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
});

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(saltBytes).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, iterations, keylen, digest).toString('hex');
}

userSchema.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, iterations, keylen, digest).toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function () {
    let expriry = new Date();
    expriry.setDate(expriry.getDate() + 7); // should only add 5 minutes not 7 days

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expriry.getTime() / 1000)
    }, process.env.JWT_SECRET);
};

mongoose.model('User', userSchema, 'users');