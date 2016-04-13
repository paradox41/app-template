import gulp from 'gulp';

import changelog from 'gulp-conventional-changelog';

gulp.task('changelog', function() {
  let opts = {
    buffer: false
  };

  return gulp.src('CHANGELOG.md', opts)
    .pipe(changelog({
      preset: 'angular'
    }))
    .pipe(gulp.dest('./'));
});
