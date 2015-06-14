// this is needed because it *looks* like karma wants an absolute
// path to the conf file
import {resolve} from 'path';

var karmaConfigPath = resolve('.') + '/karma.conf.js';

export default {
    app: './app',
    build: './build',
    html: {
        files: [
            './app/**/*.html',
            '!./app/bower_components/**/*.html'
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
        dev: {
            entry: './app/app.js',
            out: 'app.min.js'
        },
        vendor: {
            libs: [
                'lodash'
            ],
            out: 'vendor.min.js'
        }
    },
    test: {
        karma: karmaConfigPath
    }
};
