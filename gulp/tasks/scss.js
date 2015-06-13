import config from '../config';

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import filter from 'gulp-filter';
import minify from 'gulp-minify-css';

import {reload} from 'browser-sync';

gulp.task('scss:dev', function(cb) {
    return gulp.src(config.scss.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest(config.app))
        .pipe(filter(config.app + '/*.css'))
        .pipe(filter('*.css'))
        .pipe(reload({
            stream: true
        }));
    cb();
});

gulp.task('scss:build', function() {
    return gulp.src(config.scss.src)
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(minify({
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest(config.build));
});
