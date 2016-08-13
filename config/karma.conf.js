module.exports = function(config) {
  var options = {

    frameworks: ['mocha', 'chai'],

    files: [
      '../test.spec.js'
    ],

    exclude: [],

    preprocessors: {
      '../test.spec.js': ['webpack', 'sourcemap']
    },

    webpack: require('./webpack.test'),

    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
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
