require('babel-core/register');

const path = require('path');
const chalk = require('chalk');
const express = require('express');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

// setup chai
chai.use(chaiAsPromised);
const expect = chai.expect;

// setup express
const app = express();

const opts = {
  port: 8080
};

exports.config = {
  directConnect: true,
  capabilities: {
    browserName: 'chrome',
    shardTestFiles: true,
    maxInstances: 5
  },
  framework: 'mocha',
  specs: [
    './**/*.e2e-spec.js'
  ],
  baseUrl: `http://localhost:${opts.port}/`,
  onPrepare: function() {
    // add globals like `expect` so tests don't have to set them up every time
    global.expect = expect;

    // tell express to serve from the build directory
    app.use(express.static(path.resolve('build')));

    app.listen(opts.port, function() {
      // eslint-disable-next-line no-console
      console.log(chalk.bgMagenta.bold(`Server started on port ${opts.port}`));
    });
  }
};
