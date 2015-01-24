
module.exports = {
  method: 'GET',
  path: '/hello/{name}',
  handler: function (request, reply) {
    reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
  }
};