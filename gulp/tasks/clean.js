var config = require('../config');

var gulp = require('gulp');

gulp.task('clean', function(cb) {
    require('del')([config.build], {
        force: true
    }, cb);
});
