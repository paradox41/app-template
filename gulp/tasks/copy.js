import config from '../config';

import gulp from 'gulp';

import debug from 'gulp-debug';

gulp.task('copy', function() {
    return gulp.src([
        './app/**/*.{tff,woff,woff2,ico,txt,png,svg,jpg,jpeg,json,geojson,csv}'
    ], {
        base: config.app
    })
    .pipe(debug({
        title: '[copy]'
    }))
    .pipe(gulp.dest(config.build));
});
