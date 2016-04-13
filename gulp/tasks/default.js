import gulp from 'gulp';

import runSequence from 'run-sequence';

gulp.task('default', function() {
  runSequence([
    'handlebars',
    'scss'
  ], 'browser-sync');
});
