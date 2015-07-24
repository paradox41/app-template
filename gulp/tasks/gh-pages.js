import config from '../config';

import gulp from 'gulp';
import pages from 'gulp-gh-pages';

gulp.task('gh-pages', function() {
    return gulp.src('./docs/**/*')
        .pipe(pages());
});
