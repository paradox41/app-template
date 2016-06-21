var path = require('path');
var express = require('express');

var app = express();

exports.config = {
  directConnect: true,
  capabilities: {
    'browserName': 'chrome',
    shardTestFiles: true,
    maxInstances: 5
  },
  framework: 'mocha',
  specs: ['./**/*.e2e-spec.js'],
  baseUrl: 'http://localhost:8080/',
  onPrepare: function() {
    app.use(express.static(path.resolve('build')));

    app.listen(8080, function() {
      // eslint-disable-next-line no-console
      console.log('Server started');
    });
  }
};
