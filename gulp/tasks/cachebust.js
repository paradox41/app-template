var config = require('../config');

var gulp = require('gulp');

var rev = require('gulp-rev');

gulp.task('cachebust', function() {
    return gulp.src([config.build + '/*.{css,js}'], {
            base: config.app
        })
        .pipe(gulp.dest(config.build))
        .pipe(rev())
        .pipe(gulp.dest(config.build))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.build));
});
