var config = require('../config');

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var jshint = require('gulp-jshint');

gulp.task('jshint', function() {
    return gulp.src(config.js.files)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});
