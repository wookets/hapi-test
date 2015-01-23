
module.exports = function(server) {
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
};