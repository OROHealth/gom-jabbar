const user = require('./user');

module.exports = (app) => {
    app.use('/user', user);
}