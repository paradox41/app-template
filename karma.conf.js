module.exports = function(config) {
    var options = {

        frameworks: ['mocha', 'browserify', 'chai'],

        files: [
            'app/**/*.spec.js'
        ],

        exclude: [],

        preprocessors: {
            'app/**/*.js': ['browserify', 'coverage']
        },

        reporters: ['spec', 'coverage', 'coveralls'],
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

        browserify: {
            extensions: ['.js'],
            debug: true,
            transform: ['babelify', 'partialify']
        },

        // tests on Travis were timing out
        browserDisconnectTimeout: 60000,
        browserNoActivityTimeout: 60000
    };

    if (process.env.TRAVIS) {
        options.browsers = ['ChromeTravisCI'];
    }

    config.set(options);
};
