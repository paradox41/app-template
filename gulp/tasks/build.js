import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build', function() {
    runSequence('test:once', 'lint', 'clean', 'copy:build', [
        'browserify',
        'browserify:vendor:build',
        'scss:build'
    ], 'cachebust', 'handlebars:build');
});
