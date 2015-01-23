
var _ = require('lodash');

module.exports = function(server) {

  _.each(require('../api'), function(route) {
    route.path = '/api' + route.path;
    server.route(route);
  });

};