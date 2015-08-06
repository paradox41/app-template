import gulp from 'gulp';

import runSequence from 'run-sequence';

gulp.task('default', function() {
    runSequence([
        'browserify:dev',
        'browserify:vendor',
        'handlebars:dev',
        'scss:dev',
        'watch'
    ], 'serve');
});

gulp.task('pre-push', [
    'lint',
    'test:once'
]);
