
var Hapi = require('hapi');


var server = new Hapi.Server();
server.connection({ routes: {files: {relativeTo: __dirname + '/client'}}});
server.connection({ port: process.env.PORT || 3000 });

// include api
require('./server/lib/hapi-api')(server);

// include static file serving (ie the client folder)
server.route(require('./server/lib/hapi-static'));

server.register(require('./server/lib/hapi-plugins'), function (err) {
  if (err) throw err; // something bad happened loading the plugin

  if (!module.parent) { // dont start server if we are just running a test
    server.start(function () {
      server.log('info', 'Server running at: ' + server.info.uri);
    });
  }
});

module.exports = server;
