import config from '../config';

import gulp from 'gulp';

import {create} from 'browser-sync';

const browserSync = create();

gulp.task('scss:watch', ['scss:dev'], function() {
    browserSync.reload();
});

gulp.task('browser-sync', function() {
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

    gulp.watch(config.scss.files, ['scss:watch']);
    gulp.watch(config.hbs.files, ['handlebars:dev']);
});
