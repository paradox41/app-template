var config = require('../config');

var gulp = require('gulp');

var karma = require('karma').server;

gulp.task('test', function(done) {
    karma.start({
        configFile: config.test.karma
    }, done);
});
