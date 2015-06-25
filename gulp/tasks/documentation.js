import config from '../config';

import gulp from 'gulp';

import documentation from 'gulp-documentation';

gulp.task('documentation', function() {
    return gulp.src(`${config.app}/app.js`)
        .pipe(documentation({
            format: 'md'
        }))
        .pipe(gulp.dest('./docs'));
});
