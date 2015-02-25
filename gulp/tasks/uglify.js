var config = require('../config');

var gulp = require('gulp');

var uglify = require('gulp-uglify');

gulp.task('uglify', function() {
    return gulp.src(config.build + '/*.worker.js')
        .pipe(uglify())
        .pipe(gulp.dest(config.build));
});
