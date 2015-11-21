import gulp from 'gulp';

import runSequence from 'run-sequence';

gulp.task('default', function() {
    runSequence([
        'handlebars:dev',
        'scss:dev',
    ], 'browser-sync');
});

gulp.task('pre-push', [
    'lint',
    'test:once'
]);
