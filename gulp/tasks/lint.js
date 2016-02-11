import config from '../config';

import gulp from 'gulp';
import eslint from 'gulp-eslint';
import debug from 'gulp-debug';

gulp.task('lint', function() {
    return gulp.src(config.js.files)
        .pipe(debug({
            title: '[eslint]'
        }))
        .pipe(eslint())
        .pipe(eslint.format());
});
