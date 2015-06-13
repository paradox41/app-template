import config from '../config';

import gulp from 'gulp';

import browserSync from 'browser-sync';

gulp.task('reload', function() {
    browserSync.reload();
});

gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: config.app
        },
        notify: false
    });
});

gulp.task('serve:build', function() {
    browserSync({
        server: {
            baseDir: config.build
        },
        notify: false
    });
});
