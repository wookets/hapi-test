
var _ = require('lodash');
var Hapi = require('hapi');


var server = new Hapi.Server();
server.connection({ routes: {files: {relativeTo: __dirname + '/client'}}});
server.connection({ port: process.env.PORT || 3000 });

// include api
_.each(require('./server/api'), function(route) {
  route.path = '/api' + route.path;
  server.route(route);
});

// include static file serving (ie the client folder)
server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'client',
      listing: true,
      index: true,
      lookupCompressed: true
    }
  }
});

server.register([
  { register: require('lout') },
  { register: require('good'),
    options: {
      reporters: [{
        reporter: require('good-console'),
        args:[{ log: '*', response: '*' }]
      }]
    }
  }
], function (err) {
  if (err) {
    throw err; // something bad happened loading the plugin
  }

  server.start(function () {
    server.log('info', 'Server running at: ' + server.info.uri);
  });
});