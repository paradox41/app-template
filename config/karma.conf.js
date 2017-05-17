require('babel-core/register');

module.exports = function(config) {
  const options = {
    frameworks: ['mocha', 'chai'],

    files: ['../test.spec.js'],

    exclude: [],

    preprocessors: {
      '../test.spec.js': ['webpack', 'sourcemap']
    },

    webpack: require('./webpack.test.babel'),

    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    },

    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: '../coverage/',
      subdir: '.',
      reporters: [
        {
          type: 'text-summary'
        },
        {
          type: 'lcov'
        }
      ]
    },
    port: 9876,
    colors: true,

    logLevel: config.LOG_INFO,

    browsers: ['Chrome'],

    autoWatch: false,
    singleRun: true,

    browserDisconnectTimeout: 60000,
    browserNoActivityTimeout: 60000
  };

  if (process.env.CI) {
    options.reporters.push('coveralls');
  }

  config.set(options);
};
