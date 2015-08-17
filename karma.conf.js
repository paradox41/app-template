module.exports = function(config) {
    config.set({

        frameworks: ['mocha', 'browserify', 'chai'],

        files: [
            'app/**/*.spec.js'
        ],

        exclude: [
            'app/bower_components/**/*.js'
        ],

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

        // config.LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true,

        browserify: {
            extensions: ['.js'],
            debug: true,
            transform: ['babelify', 'partialify']
        }
    });
};
