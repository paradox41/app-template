import gulp from 'gulp';

gulp.task('default', [
    'browserify',
    'browserify:vendor',
    'handlebars:dev',
    'serve',
    'scss:dev',
    'watch'
]);
