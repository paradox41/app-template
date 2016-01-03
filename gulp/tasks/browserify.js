import config from '../config';
import options from '../options';

import _ from 'lodash';

import gulp from 'gulp';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';
import uglify from 'gulp-uglify';

import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

import watchify from 'watchify';
import browserify from 'browserify';

// transforms
import babelify from 'babelify';
import partialify from 'partialify';
import stripify from 'stripify';
import aliasify from 'aliasify';

const aliasifyConfig = config.browserify.aliasify;

/**
 * Array of libs that should be excluded from the app bundle
 * We can make this dynamic if we want to
 */
var libs = config.browserify.vendor.libs;

/**
 * Browserify for development, mostly app code
 */
gulp.task('browserify', function() {
    var bundler = null;
    var {env, debug} = options;

    gutil.log(gutil.colors.magenta(`Running browserify in ${gutil.colors.green(env)} mode`));

    var baseOpts = {
        entries: config.browserify.dev.entries,
        fullPaths: true,
        extensions: ['.js', '.html', '.json'],
        debug: debug
    };

    if (env === 'development') {
        var opts = _.extend({}, watchify.args, baseOpts, {
            cache: {},
            packageCache: {}
        });

        bundler = watchify(browserify(opts));

        bundler.transform(babelify);
        bundler.transform(partialify);
        bundler.transform(aliasify, aliasifyConfig);

        // on any dep update, runs the bundler
        bundler.on('update', bundle);
    } else {
        bundler = browserify(baseOpts);

        bundler.transform(babelify);
        bundler.transform(partialify);
        bundler.transform(aliasify, aliasifyConfig);
        bundler.transform(stripify);
    }

    function bundle() {
        return bundler.bundle()
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source(config.browserify.dev.out))
            .pipe(buffer())
            .pipe(gulpif(env === 'production', uglify()))
            .pipe(gulpif(env === 'production', gulp.dest(config.build), gulp.dest(config.app)));
    }

    libs.forEach(function(lib) {
        bundler.exclude(lib);
    });

    return bundle();
});

/**
 * Browserify for our vendor bundle
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

/**
 * Browserify for our vendor bundle
 */
gulp.task('browserify:vendor:build', function() {
    var bundler = browserify();

    libs.forEach(function(lib) {
        bundler.require(lib);
    });

    return bundler.bundle()
        .pipe(source(config.browserify.vendor.out))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(config.build));
});
