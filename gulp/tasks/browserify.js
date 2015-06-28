/* global process */
import config from '../config';

import _ from 'lodash';

import minimist from 'minimist';

import gulp from 'gulp';
import gutil from 'gulp-util';
// import gulpif from 'gulp-if';

// import filter from 'gulp-filter';
// import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import uglify from 'gulp-uglify';

import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

import watchify from 'watchify';
import browserify from 'browserify';

// import {reload} from 'browser-sync';

// transforms
import babelify from 'babelify';
import partialify from 'partialify';
import stripify from 'stripify';

/*
    Capture any args that might have been passed in
*/
var knownOptions = {
    string: 'env',
    'boolean': 'debug',
    'default': {
        env: process.env.NODE_ENV || 'development',
        debug: false
    }
};

var options = minimist(process.argv.slice(2), knownOptions);

/*
    Array of libs that should be excluded from the app bundle
    We can make this dynamic if we want to
*/
var libs = config.browserify.vendor.libs;

/*
    Browserify for development, mostly app code
*/
gulp.task('browserify:dev', function() {
    var devOpts = {
        entries: config.browserify.dev.entries,
        cache: {},
        packageCache: {},
        fullPaths: true,
        extensions: ['.js', '.html'],
        debug: options.debug
    };

    var opts = _.extend({}, watchify.args, devOpts);
    var bundler = watchify(browserify(opts));

    function bundle() {
        return bundler.bundle()
            .pipe(plumber())
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source(config.browserify.dev.out))
            .pipe(buffer())
            .pipe(gulp.dest(config.app));
    }

    // add transformations here
    bundler.transform(babelify);
    bundler.transform(partialify);

    libs.forEach(function(lib) {
        bundler.exclude(lib);
    });

    bundler.on('update', bundle); // on any dep update, runs the bundler
    bundler.on('log', gutil.log); // output build logs to terminal

    return bundle();
});

/*
    Browserify for our vendor bundle
*/
gulp.task('browserify:vendor', function() {
    var bundler = browserify({
        debug: true
    });

    libs.forEach(function(lib) {
        bundler.require(lib);
    });

    return bundler.bundle()
        .pipe(source(config.browserify.vendor.out))
        .pipe(buffer())
        .on('error', gutil.log)
        .pipe(gulp.dest(config.app));
});

/*
    Browserify for our build
*/
gulp.task('browserify:build', function() {
    var bundler = browserify({
        entries: config.browserify.dev.entries,
        transform: [
            babelify,
            partialify,
            stripify
        ]
    });

    libs.forEach(function(lib) {
        bundler.exclude(lib);
    });

    function bundle() {
        return bundler
            .bundle()
            .pipe(source(config.browserify.dev.out))
            .pipe(buffer())
            // add transformation tasks to the pipeline here
            .pipe(uglify())
            .pipe(gulp.dest(config.build));
    }

    return bundle();
});

/*
    Browserify for our vendor bundle
*/
gulp.task('browserify:vendor:build', function() {
    var bundler = browserify({
        entries: config.browserify.vendor.entries
    });

    libs.forEach(function(lib) {
        bundler.require(lib);
    });

    return bundler.bundle()
        .pipe(source(config.browserify.vendor.out))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(config.build));
});
