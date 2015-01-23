
var Hapi = require('hapi');


var server = new Hapi.Server();
server.connection({ routes: {files: {relativeTo: __dirname + '/client'}}});
server.connection({ port: process.env.PORT || 3000 });

// include api
require('./server/lib/hapi-api')(server);

// include static file serving (ie the client folder)
require('./server/lib/hapi-static')(server);

require('./server/lib/hapi-plugins')(server, function() {
  server.start(function () {
    server.log('info', 'Server running at: ' + server.info.uri);
  });
});