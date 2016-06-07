var webpack = require('webpack');

var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

var webpackConfig = require('./webpack.config');

module.exports = function(config) {
  var options = {

    frameworks: ['mocha', 'chai'],

    files: [
      'test.spec.js'
    ],

    exclude: [],

    preprocessors: {
      'test.spec.js': ['webpack', 'sourcemap']
    },

    webpack: Object.assign(webpackConfig, {
      devtool: 'inline-source-map',
      debug: false,
      entry: {},
      plugins: [
        new LodashModuleReplacementPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoErrorsPlugin()
      ]
    }),

    webpackMiddleware: {
      noInfo: true
    },

    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      subdir: '.',
      reporters: [{
        type: 'text-summary'
      }, {
        type: 'lcov'
      }]
    },
    port: 9876,
    colors: true,

    logLevel: config.LOG_INFO,

    browsers: ['Chrome'],
    customLaunchers: {
      ChromeTravisCI: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    autoWatch: false,
    singleRun: true,

    // tests on Travis were timing out
    browserDisconnectTimeout: 60000,
    browserNoActivityTimeout: 60000
  };

  if (process.env.TRAVIS) {
    options.browsers = ['ChromeTravisCI'];

    options.reporters.push('coveralls');
  }

  config.set(options);
};
