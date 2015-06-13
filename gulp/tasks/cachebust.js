import config from '../config';

import gulp from 'gulp';

import rev from 'gulp-rev';

gulp.task('cachebust', function() {
    return gulp.src([config.build + '/**/*.{css,js}'], {
            base: config.build
        })
        .pipe(gulp.dest(config.build))
        .pipe(rev())
        .pipe(gulp.dest(config.build))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.build));
});
