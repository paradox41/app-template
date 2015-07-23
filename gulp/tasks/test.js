import config from '../config';

import gulp from 'gulp';

import {server} from 'karma';

gulp.task('test:once', function(done) {
    server.start({
        configFile: config.test.karma
    }, done);
});

gulp.task('test:watch', function(done) {
    server.start({
        configFile: config.test.karma,
        singleRun: false,
        autoWatch: true
    }, done);
});
