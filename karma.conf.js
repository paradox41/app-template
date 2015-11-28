module.exports = function(config) {
    config.set({

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
        autoWatch: false,
        browsers: ['Chrome'],
        singleRun: true,

        browserify: {
            extensions: ['.js'],
            debug: true,
            transform: ['babelify', 'partialify']
        },

        // tests on Travis were timing out
        browserDisconnectTimeout: 60000,
        browserNoActivityTimeout: 60000
    });
};
