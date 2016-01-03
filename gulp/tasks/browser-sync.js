import config from '../config';

import gulp from 'gulp';

import {create} from 'browser-sync';

const browserSync = create();

gulp.task('browserify:watch', ['browserify'], function() {
    browserSync.reload();
});

gulp.task('scss:watch', ['scss:dev'], function() {
    browserSync.reload();
});

gulp.task('browser-sync', ['browserify', 'browserify:vendor'], function() {
    let browserifyFiles = config.js.files.concat(config.html.files);

    browserSync.init({
        server: {
            baseDir: config.app,
            routes: {
                '/node_modules': 'node_modules'
            }
        },
        port: 8080,
        notify: false
    });

    gulp.watch(browserifyFiles, ['browserify:watch']);
    gulp.watch(config.scss.files, ['scss:watch']);
    gulp.watch(config.hbs.files, ['handlebars:dev']);
});
