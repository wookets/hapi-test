



module.exports = function(server, cb) {

  server.register([
    {register: require('lout')},
    {register: require('good'),
      options: {
        reporters: [{
          reporter: require('good-console'),
          args: [{log: '*', response: '*'}]
        }]
      }
    }
  ], function (err) {
    if (err) throw err; // something bad happened loading the plugin
    cb();
  });

};