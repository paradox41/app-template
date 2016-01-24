import config from '../config';

import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import filter from 'gulp-filter';
import nano from 'gulp-cssnano';

import {reload} from 'browser-sync';

gulp.task('scss:dev', function() {
    return gulp.src(config.scss.src)
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            includePaths: ['./node_modules']
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest(config.app))
        .pipe(filter('*.css'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('scss:build', function() {
    return gulp.src(config.scss.src)
        .pipe(sass({
            includePaths: ['./node_modules']
        }))
        .pipe(autoprefixer())
        .pipe(nano())
        .pipe(gulp.dest(config.build));
});
