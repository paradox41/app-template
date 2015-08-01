import gulp from 'gulp';

gulp.task('default', [
    'browserify:dev',
    'browserify:vendor',
    'handlebars:dev',
    'serve',
    'scss:dev',
    'watch'
]);

gulp.task('pre-push', [
    'lint',
    'test:once'
]);
