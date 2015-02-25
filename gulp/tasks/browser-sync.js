var config = require('../config');

var gulp = require('gulp');

var browserSync = require('browser-sync');

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
