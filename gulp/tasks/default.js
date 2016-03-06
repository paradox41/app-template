import gulp from 'gulp';

import runSequence from 'run-sequence';

gulp.task('default', function() {
    runSequence([
        'copy',
        'handlebars',
        'scss'
    ], 'browser-sync');
});
