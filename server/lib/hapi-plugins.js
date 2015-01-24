



module.exports = [
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