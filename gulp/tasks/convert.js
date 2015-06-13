import config from '../config';

import gulp from 'gulp';
import rename from 'gulp-rename';
import debug from 'gulp-debug';

gulp.task('convert', function() {
    return gulp.src(config.app + '/bower_components/**/*.css')
        .pipe(debug({
            title: '[convert]:'
        }))
        .pipe(rename({
            extname: '.copy.scss'
        }))
        .pipe(gulp.dest(config.app + '/bower_components/'));
});
