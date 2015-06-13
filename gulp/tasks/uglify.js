import config from '../config';

import gulp from 'gulp';

import uglify from 'gulp-uglify';

gulp.task('uglify', function() {
    return gulp.src(config.build + '/*.worker.js')
        .pipe(uglify())
        .pipe(gulp.dest(config.build));
});
