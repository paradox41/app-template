import config from '../config';

import gulp from 'gulp';

import debug from 'gulp-debug';

gulp.task('copy:build', function() {
    return gulp.src([
        './app/**/*.{tff,woff,woff2,ico,txt,png,svg,jpg,jpeg,json,geojson,csv,hbs}',
        '!*.map'
    ], {
        base: config.app
    })
    .pipe(debug({
        title: '[copy]'
    }))
    .pipe(gulp.dest(config.build));
});
