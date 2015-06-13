import config from '../config';

import gulp from 'gulp';

gulp.task('clean', function(cb) {
    require('del')([config.build], {
        force: true
    }, cb);
});
