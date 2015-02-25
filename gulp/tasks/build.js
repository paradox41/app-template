var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function() {
    runSequence('test', 'jshint', 'clean', [
        // these are done async
        'copy:build',
        'browserify:build',
        'scss:build',
        'changelog'
    ], 'cachebust', 'handlebars:build', 'generate-service-worker', 'uglify');
});
