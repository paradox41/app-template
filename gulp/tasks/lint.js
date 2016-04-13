import config from '../config';

import gulp from 'gulp';
import eslint from 'gulp-eslint';
import debug from 'gulp-debug';
import stylelint from 'gulp-stylelint';

gulp.task('lint', ['lint:scss'], function() {
  return gulp.src(config.js.files)
    .pipe(debug({
      title: '[eslint]'
    }))
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('lint:scss', function() {
  return gulp.src(config.scss.files)
    .pipe(debug({
      title: '[stylelint]'
    }))
    .pipe(stylelint({
      syntax: 'scss',
      reporters: [{
        formatter: 'string',
        console: true
      }],
      debug: true
    }));
});
