import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build', function() {
    runSequence('test:once', 'lint', 'clean', 'copy:build', [
        // these are done async
        'browserify:build',
        'browserify:vendor:build',
        'scss:build'
    ], 'cachebust', 'handlebars:build');
});
