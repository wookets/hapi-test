
var Code = require('code');
var Lab = require('lab');
var server = require('../app');

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('hello', function() {
  // tests
  it("should send a hello to us", function(done) {
    var options = {
      method: 'GET',
      url: '/api/hello/fred'
    };
    server.inject(options, function(response) {
      var result = response.result;

      expect(response.statusCode).to.equal(200);
      expect(result).to.be.a.string();
      expect(result).to.equal('Hello, fred!');

      done();
    });
  });
});