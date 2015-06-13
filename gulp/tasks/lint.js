import config from '../config';

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import eslint from 'gulp-eslint';
import jscs from 'gulp-jscs';

gulp.task('lint', function() {
    return gulp.src(config.js.files)
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(jscs());
});
