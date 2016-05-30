module.exports = function(config) {
  var options = {

    frameworks: ['mocha', 'chai'],

    files: [
      'test.spec.js'
    ],

    exclude: [],

    preprocessors: {
      'test.spec.js': ['webpack', 'sourcemap', 'coverage']
    },

    webpack: require('./webpack.config.test.js'),

    webpackMiddleware: {
      noInfo: true
    },

    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      reporters: [{
        type: 'text-summary'
      }, {
        type: 'json'
      }, {
        type: 'html'
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
