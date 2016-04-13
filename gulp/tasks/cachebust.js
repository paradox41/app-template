import config from '../config';

import gulp from 'gulp';

import rev from 'gulp-rev';

import runSequence from 'run-sequence';

gulp.task('rev', function() {
  let files = [`${config.build}/**/*.{css,js}`];
  let opts = {
    base: config.build
  };

  return gulp.src(files, opts)
    .pipe(gulp.dest(config.build))
    .pipe(rev())
    .pipe(gulp.dest(config.build))
    .pipe(rev.manifest())
    .pipe(gulp.dest(config.build));
});

gulp.task('cachebust', function() {
  runSequence('rev', 'handlebars');
});
