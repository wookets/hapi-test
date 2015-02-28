
var Hapi = require('hapi');


var server = new Hapi.Server();
server.connection({ routes: {files: {relativeTo: __dirname + '/client'}}});
server.connection({ port: process.env.PORT || 3000 });

// include api
require('./server/lib/hapi-api')(server);

// include static file serving (ie the client folder)
server.route(require('./server/lib/hapi-static'));

var validate = function (decodedToken, callback) {

  var error,
    credentials = accounts[decodedToken.accountId] || {};

  if (!credentials) {
    return callback(error, false, credentials);
  }

  return callback(error, true, credentials)
};


server.register(require('./server/lib/hapi-plugins'), function (err) {
  if (err) throw err; // something bad happened loading the plugin

  server.auth.strategy('token', 'jwt', {
    key: 'mneow',
    validateFunc: validate
  });

  server.route({
    method: 'GET',
    path: '/secure',
    config: {
      auth: 'token'
    },
    handler: function(request, reply) {
      console.log('scure');
    }
  });

  // With scope requirements
  server.route({
    method: 'GET',
    path: '/withScope',
    config: {
      auth: {
        strategy: 'token',
        scope: ['a']
      }
    },
    handler: function(request, reply) {
      console.log('roles')
    }
  });

  if (!module.parent) { // dont start server if we are just running a test
    server.start(function () {
      server.log('info', 'Server running at: ' + server.info.uri);
    });
  }
});

module.exports = server;
