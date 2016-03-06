import config from '../config';

import gulp from 'gulp';

import { create } from 'browser-sync';

import stripAnsi from 'strip-ansi';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';

import webpackConfig from '../../webpack.config';

var bundler = webpack(webpackConfig);

const browserSync = create();

gulp.task('scss:watch', ['scss'], function() {
    browserSync.reload();
});

gulp.task('browser-sync', function() {
    /**
     * Reload all devices when bundle is complete
     * or send a fullscreen error message to the browser instead
     */
    bundler.plugin('done', function(stats) {
        if (stats.hasErrors() || stats.hasWarnings()) {
            return browserSync.sockets.emit('fullscreen:message', {
                title: 'Webpack Error:',
                body: stripAnsi(stats.toString()),
                timeout: 100000
            });
        }
        browserSync.reload();
    });

    /**
     * Run Browsersync and use middleware for Hot Module Replacement
     */
    browserSync.init({
        server: config.build,
        middleware: [
            webpackDevMiddleware(bundler, {
                publicPath: webpackConfig.output.publicPath,
                stats: {
                    colors: true
                }
            })
        ],
        plugins: ['bs-fullscreen-message'],
        files: [
            'app/app.css',
            'app/**/*.html'
        ]
    });

    gulp.watch(config.scss.files, ['scss:watch']);
    gulp.watch(config.hbs.files, ['handlebars']);
});
