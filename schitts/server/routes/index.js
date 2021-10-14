const get_routes = require('./get');
const post_routes = require('./post');

module.exports = function (app) {
  app.use('/api/', get_routes);
  app.use('/api/', post_routes);
};
