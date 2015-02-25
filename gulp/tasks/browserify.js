var config = require('../config');

var gulp = require('gulp');
var gutil = require('gulp-util');

var filter = require('gulp-filter');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var watchify = require('watchify');
var browserify = require('browserify');

var reload = require('browser-sync').reload;

// transforms
var babelify = require('babelify');
var partialify = require('partialify');
var stripify = require('stripify');


gulp.task('browserify:dev', function() {
    var bundler = watchify(browserify({
        entries: [config.browserify.in],
        cache: {},
        packageCache: {},
        fullPaths: true
    }));

    var bundle = function() {
        return bundler.bundle()
            .pipe(plumber())
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source(config.browserify.out))
            .pipe(buffer())
            .pipe(sourcemaps.init({
                loadMaps: true
            }))
            .pipe(sourcemaps.write('./'))
            .pipe(filter('*.min.js'))
            .pipe(gulp.dest(config.app))
            .pipe(reload({
                stream: true
            }));
    };

    bundler.transform(babelify);
    bundler.transform(partialify);

    bundler.on('error', gutil.log.bind(gutil, 'Browserify Error'));

    bundler.on('update', bundle);

    // bundler.on('log', function(msg) {
    //     gutil.log('Browserify build: ', gutil.colors.magenta(msg));
    // });

    return bundle();
});

gulp.task('browserify:build', function() {

    var bundler = browserify({
        entries: [config.browserify.in]
    });

    var bundle = function() {
        return bundler
            .bundle()
            .pipe(source(config.browserify.out))
            .pipe(buffer())
            // Add transformation tasks to the pipeline here.
            .pipe(uglify())
            .pipe(gulp.dest(config.build));
    };

    bundler.transform(babelify);
    bundler.transform(partialify);
    bundler.transform(stripify);

    return bundle();
});
