module.exports = function(config) {
    var options = {

        frameworks: ['mocha', 'chai'],

        plugins: [
            'karma-mocha',
            'karma-chai',
            'karma-coverage',
            'karma-coveralls',
            'karma-webpack',
            'karma-chrome-launcher',
            'karma-spec-reporter',
            'karma-sourcemap-loader'
        ],

        files: [
            'app/app.spec.js'
        ],

        exclude: [],

        preprocessors: {
            'app/app.spec.js': ['webpack', 'sourcemap', 'coverage']
        },

        webpack: require('./webpack.test.config.js'),

        webpackMiddleware: {
            noInfo: true
        },

        reporters: ['spec', 'coverage'],
        coverageReporter: {
            type: 'lcov',
            dir: 'coverage/'
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
