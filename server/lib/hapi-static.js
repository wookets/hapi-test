
module.exports = {
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
};