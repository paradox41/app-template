var config = require('../config');

var gulp = require('gulp');

var debug = require('gulp-debug');

gulp.task('copy:build', function() {
    return gulp.src([
        './app/**/*.{tff,woff,woff2,ico,txt,png,svg,jpg,jpeg,json,geojson,csv}',
        './app/*.worker.js',
        '!*.map',
        '!./app/bower_components/**/*.{json,txt,csv}'
    ], {
        base: './app'
    })
    .pipe(debug({
        title: 'copy'
    }))
    .pipe(gulp.dest(config.build));
});
