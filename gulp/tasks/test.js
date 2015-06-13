import config from '../config';

import gulp from 'gulp';

var karma = require('karma').server;

gulp.task('test', function(done) {
    karma.start({
        configFile: config.test.karma
    }, done);
});
