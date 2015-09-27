import config from '../config';

import gulp from 'gulp';
import sassdoc from 'sassdoc';


gulp.task('sassdoc', function() {
    return gulp.src(config.scss.files)
        .pipe(sassdoc());
});
