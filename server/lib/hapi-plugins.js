



module.exports = [
  {register: require('hapi-auth-jwt')},
  {register: require('lout')},
  {register: require('good'),
    options: {
      reporters: [{
        reporter: require('good-console'),
        args: [{log: '*', response: '*'}]
      }]
    }
  }
];