import config from '../config';
import options from '../options';

import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import filter from 'gulp-filter';
import nano from 'gulp-cssnano';
import gulpif from 'gulp-if';

import {reload} from 'browser-sync';

gulp.task('scss', function() {
    return gulp.src(config.scss.src)
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            includePaths: ['./node_modules']
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest(config.build))
        .pipe(filter('*.css'))
        .pipe(gulpif(options.env === 'production', nano()))
        .pipe(gulpif(options.env === 'development', reload({
            stream: true
        })));
});
