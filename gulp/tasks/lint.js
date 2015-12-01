import config from '../config';

import gulp from 'gulp';
import eslint from 'gulp-eslint';

gulp.task('lint', function() {
    return gulp.src(config.js.files)
        .pipe(eslint())
        .pipe(eslint.format());
});
