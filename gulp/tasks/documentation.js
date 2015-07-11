import config from '../config';

import gulp from 'gulp';

import browserSync from 'browser-sync';

gulp.task('documentation:serve', function() {
    browserSync({
        server: {
            baseDir: config.docs
        },
        notify: false
    });
});
