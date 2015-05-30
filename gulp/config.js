// this is needed because it *looks* like karma wants an absolute
// path to the conf file
var karmaConfigPath = require('path').resolve('.') + '/karma.conf.js';

module.exports = {
    app: './app',
    build: './build',
    html: {
        files: [
            './app/**/*.html',
            '!./app/bower_components/**/*.html',
        ]
    },
    hbs: {
        files: [
            './app/*.hbs'
        ]
    },
    js: {
        files: [
            './app/**/*.js',
            '!./app/**/*.spec.js',
            '!./app/bower_components/**/*.js',
            '!./app/*.min.js',
            '!./app/*.worker.js'
        ]
    },
    scss: {
        files: [
            './app/**/*.scss',
            '!./app/bower_components/**/*.scss'
        ],
        src: './app/app.scss',
        devDest: './app/app.css',
        buildDest: './build/app.css'
    },
    browserify: {
        in: './app/app.js',
        out: 'app.min.js'
    },
    test: {
        karma: karmaConfigPath
    },
    serviceWorker: {
        name: 'service.worker.js'
    }
};
