const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const AuthService = {
    getUserWithUserName(db, userName) {
        console.log('authServivce:', userName)
        return db('users')
            .where( 'email', userName )
            .first()
    },
    comparePasswords(password, hash) {
        return bcrypt.compare(password, hash)
    },
    createJwt(subject, payload) {
        return jwt.sign(payload, config.JWT_SECRET, {
            subject,
            algorithm: 'HS256',
        })
    },
    verifyJwt(token) {
        return jwt.verify(token, config.JWT_SECRET, {
            algorithms: ['HS256'],
        })
    },
    parseBasicToken(token) {
        return Buffer
            .from(token, 'base64')
            .toString()
            .split(':')
    },
}

module.exports = AuthService;