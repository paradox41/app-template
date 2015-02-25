var gulp = require('gulp');

gulp.task('default', [
    'browserify:dev',
    'handlebars:dev',
    'serve',
    'scss:dev',
    'watch'
]);
